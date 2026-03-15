# Railway Deployment Guide

## ⏱️ Time: 15 minutes

---

## 🚀 Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Start for Free"
3. Sign up with GitHub (recommended)
4. Authorize Railway to access your GitHub account
5. Create a new project

---

## 📦 Step 2: Deploy Backend

### Option A: Using Railway CLI (Recommended)

#### 2.1 Install Railway CLI
```bash
npm install -g @railway/cli
```

#### 2.2 Login to Railway
```bash
railway login
```

#### 2.3 Initialize Project
```bash
cd /home/ubuntu/tuya-monorepo/packages/backend
railway init
```

#### 2.4 Deploy
```bash
railway up
```

#### 2.5 Get URL
```bash
railway status
```

### Option B: Using GitHub

#### 2.1 Push Code to GitHub
```bash
cd /home/ubuntu/tuya-monorepo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tuya.git
git push -u origin main
```

#### 2.2 Deploy from Railway Dashboard
1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your repository
5. Set root directory: `packages/backend`
6. Click "Deploy"

---

## 🔧 Step 3: Configure Environment Variables

### In Railway Dashboard:

1. Go to your project
2. Click "Variables"
3. Add the following:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
SOCKET_IO_CORS_ORIGIN=https://driver-app.vercel.app,https://passenger-app.vercel.app,https://admin-dashboard.vercel.app
```

### Get DATABASE_URL from Supabase:

1. Go to Supabase dashboard
2. Settings → Database
3. Copy PostgreSQL Connection String
4. Replace [PASSWORD] with your actual password

---

## ✅ Step 4: Verify Deployment

### Check Logs
```bash
railway logs
```

### Test Health Endpoint
```bash
# Get your Railway URL from dashboard
curl https://your-railway-url/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-03-12T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Test Status Endpoint
```bash
curl https://your-railway-url/api/status
```

---

## 🔌 Step 5: Configure CORS

In Railway environment variables, update:
```
SOCKET_IO_CORS_ORIGIN=https://driver-app-xxx.vercel.app,https://passenger-app-xxx.vercel.app,https://admin-dashboard-xxx.vercel.app
```

---

## 📊 Step 6: Monitor Deployment

### View Logs
```bash
railway logs -f  # Follow logs
```

### Check Metrics
In Railway dashboard:
- CPU usage
- Memory usage
- Network traffic
- Error rates

### Restart Service
```bash
railway restart
```

---

## 🚨 Troubleshooting

### Build Failed
- Check logs: `railway logs`
- Verify package.json is correct
- Check Node version compatibility

### Database Connection Error
- Verify DATABASE_URL is correct
- Check Supabase is running
- Verify firewall settings

### Port Already in Use
- Change PORT to 4000
- Restart service

### CORS Error
- Update SOCKET_IO_CORS_ORIGIN
- Restart service
- Clear browser cache

---

## 📈 Performance Optimization

### Enable Caching
```javascript
app.use(express.static('public', { maxAge: '1h' }));
```

### Use Connection Pooling
```javascript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Monitor Database Queries
```javascript
// Log slow queries
if (duration > 1000) {
  console.warn(`Slow query: ${duration}ms`);
}
```

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] DATABASE_URL is secure
- [ ] CORS_ORIGIN is correct
- [ ] HTTPS is enabled
- [ ] Rate limiting is active
- [ ] Helmet security headers enabled
- [ ] Input validation enabled
- [ ] SQL injection protection enabled

---

## 📱 Step 7: Update Frontend Apps

Update environment variables in each app:

### Driver App (.env.production)
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

### Passenger App (.env.production)
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

### Admin Dashboard (.env.production)
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

---

## 🎯 Final Checklist

- [ ] Railway account created
- [ ] Backend deployed
- [ ] Environment variables set
- [ ] Health endpoint responding
- [ ] Database connected
- [ ] CORS configured
- [ ] Logs checked
- [ ] Frontend apps updated
- [ ] All tests passing

---

## 📊 Cost Estimate

**Railway Pricing:**
- Free tier: $5 credit/month
- Pay as you go: $0.000463/hour (CPU), $0.000231/hour (Memory)
- Estimated monthly cost: $5-20 depending on usage

---

## 🚀 Your Railway URL

```
https://your-railway-url
```

**Save this URL - you'll need it for:**
- Frontend environment variables
- API integration
- Socket.io connection

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Community: https://community.railway.app
- Check logs for errors: `railway logs`

---

**Status: Backend Deployed Successfully** ✅

**Next: Deploy Frontend Apps to Vercel** 🚀
