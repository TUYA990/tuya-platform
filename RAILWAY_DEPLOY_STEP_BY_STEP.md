# 🚀 Railway Deployment - Step by Step

**Status:** Ready to Deploy
**Time:** 15-20 minutes

---

## 📋 Prerequisites

- ✅ Railway account (https://railway.app)
- ✅ GitHub account
- ✅ Supabase Connection String
- ✅ Backend code ready

---

## 🎯 Step 1: Push Code to GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd /home/ubuntu/tuya-monorepo

# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial TUYA commit"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `tuya-platform`
3. Make it **Public** (for Railway to access)
4. Do NOT initialize with README

### 1.3 Push to GitHub

```bash
cd /home/ubuntu/tuya-monorepo

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/tuya-platform.git

# Push code
git branch -M main
git push -u origin main
```

---

## 🎯 Step 2: Deploy on Railway

### 2.1 Go to Railway Dashboard

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"

### 2.2 Connect GitHub

1. Click "Configure GitHub App"
2. Select your GitHub account
3. Select repository: `tuya-platform`
4. Click "Install"

### 2.3 Create Railway Project

1. Select your repository
2. Click "Deploy Now"
3. Railway will automatically detect Node.js
4. Wait for build to complete (5-10 minutes)

---

## 🎯 Step 3: Configure Environment Variables

### 3.1 In Railway Dashboard

1. Go to your project
2. Click "Variables"
3. Add the following:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:M%40ussab2252026@db.pmeftbpnggkaocphbqcw.supabase.co:5432/postgres
JWT_SECRET=tuya-jwt-secret-key-2026-production-mode-secure-key-12345
GOOGLE_MAPS_API_KEY=AIzaSyDemoKeyForTUYA2026
SOCKET_IO_CORS_ORIGIN=https://tuya-driver-app.vercel.app,https://tuya-passenger-app.vercel.app,https://tuya-admin-dashboard.vercel.app
LOG_LEVEL=info
ENABLE_GPS_VALIDATION=true
ENABLE_APP_ATTESTATION=true
ENABLE_PHONE_VERIFICATION=true
ENABLE_SURGE_PRICING=true
```

### 3.2 Save Variables

1. Click "Save"
2. Railway will redeploy automatically
3. Wait for deployment to complete

---

## 🎯 Step 4: Get Railway URL

### 4.1 Find Your URL

1. In Railway dashboard, go to your project
2. Click "Deployments"
3. Click the latest deployment
4. Look for "Domains" section
5. Copy the URL (format: `https://tuya-backend-xxx.railway.app`)

### 4.2 Save the URL

```
Railway URL: https://tuya-backend-xxx.railway.app
```

---

## 🧪 Step 5: Test Backend

### 5.1 Test Health Endpoint

```bash
curl https://[RAILWAY_URL]/api/health
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

### 5.2 Test Status Endpoint

```bash
curl https://[RAILWAY_URL]/api/status
```

### 5.3 Check Logs

1. In Railway dashboard
2. Click "Logs"
3. Look for any errors
4. Should see: "Server running on port 4000"

---

## 📊 Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| PORT | 4000 | Server port |
| NODE_ENV | production | Environment |
| DATABASE_URL | postgresql://... | Supabase connection |
| JWT_SECRET | secret-key | Authentication |
| GOOGLE_MAPS_API_KEY | api-key | Maps integration |
| SOCKET_IO_CORS_ORIGIN | urls | Real-time connection |
| LOG_LEVEL | info | Logging level |
| ENABLE_* | true | Feature flags |

---

## 🚨 Troubleshooting

### Build Failed
- Check logs in Railway dashboard
- Verify package.json is correct
- Check Node version compatibility

### Application crashed
- Check logs: "Railway Logs"
- Verify DATABASE_URL is correct
- Check all required environment variables

### Health endpoint not responding
- Wait 2-3 minutes for deployment
- Check if service is running
- Verify PORT is 4000

### CORS errors
- Update SOCKET_IO_CORS_ORIGIN
- Restart deployment
- Clear browser cache

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] GitHub connected
- [ ] Build completed successfully
- [ ] Environment variables set
- [ ] Health endpoint responding
- [ ] Logs checked
- [ ] Railway URL saved

---

## 📈 Next Steps

1. **Get Railway URL**
2. **Deploy Frontend Apps to Vercel**
3. **Update Vercel environment variables**
4. **Test integration**

---

**Status: Backend Deployed** ✅

**Next: Vercel Deployment** 🚀

---

**Need help?**
- Railway Docs: https://docs.railway.app
- Check logs in dashboard
- Verify environment variables
