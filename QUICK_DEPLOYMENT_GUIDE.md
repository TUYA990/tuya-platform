# TUYA Quick Deployment Guide (1 Hour)

## ⏱️ Timeline: 60 Minutes

### Step 1: Supabase Setup (15 minutes)

#### 1.1 Create Supabase Project
```
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Name: tuya-db
   - Password: (strong password)
   - Region: Europe or Middle East
4. Wait for project creation (5 minutes)
```

#### 1.2 Get Connection String
```
1. Go to Project Settings → Database
2. Copy PostgreSQL connection string
3. Save it (you'll need it for Railway)
```

#### 1.3 Initialize Database
```
1. Go to SQL Editor
2. Copy content from: packages/backend/src/migrations/init.sql
3. Paste and click "Run"
4. Verify tables are created
```

**Status: ✅ Database Ready**

---

### Step 2: Railway Deployment (15 minutes)

#### 2.1 Create Railway Account
```
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
```

#### 2.2 Deploy Backend
```bash
# Option A: Using Railway CLI
npm install -g @railway/cli
railway login
cd packages/backend
railway init
railway up

# Option B: Using GitHub
1. Push code to GitHub
2. In Railway: "Deploy from GitHub"
3. Select repository
4. Set root directory: packages/backend
```

#### 2.3 Setup Environment Variables
In Railway dashboard, add:
```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://[from Supabase]
JWT_SECRET=your-strong-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
SOCKET_IO_CORS_ORIGIN=http://localhost:3001,http://localhost:3002,http://localhost:3003
```

#### 2.4 Verify Deployment
```bash
# Get Railway URL
railway status

# Test API
curl https://your-railway-url/api/health
```

**Status: ✅ Backend Running**

---

### Step 3: Vercel Deployment (15 minutes)

#### 3.1 Deploy Driver App
```bash
cd apps/driver-app
vercel login
vercel deploy --prod
```

#### 3.2 Deploy Passenger App
```bash
cd apps/passenger-app
vercel deploy --prod
```

#### 3.3 Deploy Admin Dashboard
```bash
cd apps/admin-dashboard
vercel deploy --prod
```

**Status: ✅ Frontend Apps Running**

---

### Step 4: API Integration (20 minutes)

#### 4.1 Update Environment Variables

**Driver App (.env.local)**
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

**Passenger App (.env.local)**
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

**Admin Dashboard (.env.local)**
```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

#### 4.2 Update Railway CORS
In Railway environment variables:
```
SOCKET_IO_CORS_ORIGIN=https://driver-app-xxx.vercel.app,https://passenger-app-xxx.vercel.app,https://admin-dashboard-xxx.vercel.app
```

#### 4.3 Test API Connection
```bash
# Test health endpoint
curl https://your-railway-url/api/health

# Should return:
{
  "status": "OK",
  "timestamp": "2024-03-12T...",
  "uptime": 123.45,
  "environment": "production"
}
```

#### 4.4 Test Socket.io Connection
Open browser console in any app and check:
```
✅ Socket connected
✅ No CORS errors
✅ Real-time events working
```

**Status: ✅ Everything Connected**

---

## 🎯 Final Checklist

- [ ] Supabase database created
- [ ] Database tables initialized
- [ ] Railway backend deployed
- [ ] Environment variables set in Railway
- [ ] Vercel apps deployed
- [ ] API URLs updated in all apps
- [ ] CORS configured
- [ ] Health endpoint responding
- [ ] Socket.io connecting
- [ ] All tests passing

---

## 📱 Live URLs After Deployment

```
🚗 Driver App:     https://driver-app-xxx.vercel.app
👥 Passenger App:  https://passenger-app-xxx.vercel.app
⚙️ Admin Dashboard: https://admin-dashboard-xxx.vercel.app
🔌 Backend API:    https://your-railway-url/api
```

---

## ✅ Success Indicators

✅ Can access all three apps from any browser
✅ Can register and login
✅ Can request a ride
✅ Can see real-time updates
✅ Can see driver location
✅ Can complete a ride
✅ Can rate a ride

---

## 🚨 Troubleshooting

### CORS Error
- Check `SOCKET_IO_CORS_ORIGIN` in Railway
- Restart Railway service
- Clear browser cache

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check Supabase is running
- Check firewall settings

### API Not Responding
- Check Railway logs: `railway logs`
- Verify environment variables
- Check port is correct (4000)

### Socket.io Not Connecting
- Check CORS origin
- Verify WebSocket is enabled
- Check browser console for errors

---

## 📊 Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Supabase** | 500 MB DB | Free |
| **Railway** | $5/month | Free |
| **Vercel** | Unlimited | Free |
| **Total** | | **Free** |

---

## 🎉 After Deployment

1. **Test with real users** (50 drivers, 500 passengers)
2. **Monitor performance** (check logs daily)
3. **Collect feedback** (improve based on usage)
4. **Scale infrastructure** (add more resources if needed)
5. **Build native apps** (Android APK, iOS IPA)

---

## 📞 Support

- **Backend Issues:** Check Railway logs
- **Database Issues:** Check Supabase dashboard
- **Frontend Issues:** Check browser console
- **Deployment Issues:** Check deployment logs

---

**Time to Live: ~1 hour**

**Status: Ready for Beta Testing** 🚀
