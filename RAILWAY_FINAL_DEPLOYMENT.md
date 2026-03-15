# 🚀 Railway Deployment - Complete Guide

**Status:** Ready for Deployment
**Apps:** 3 (Driver, Passenger, Admin) + Backend
**Database:** PostgreSQL (Supabase)

---

## 📋 What You Have

✅ **Supabase Connection String:**
```
postgresql://postgres:M%40ussab2252026@db.pmeftbpnggkaocphbqcw.supabase.co:5432/postgres
```

✅ **Passenger App (Already Deployed):**
```
https://tuya-app-sudan.vercel.app/
```

✅ **All Code Ready:**
- Backend (Express.js + Socket.io)
- Driver App (Next.js)
- Admin Dashboard (Next.js)

---

## 🎯 Step 1: Deploy Backend to Railway

### 1.1 Go to Railway Dashboard
```
https://railway.app/dashboard
```

### 1.2 Click "New Project"

### 1.3 Select "Deploy from GitHub repo"

### 1.4 Connect GitHub Account
- Select: `Tuya990`
- Select repository: `tuya-platform`

### 1.5 Configure Backend Service

1. **Select folder:** `packages/backend`
2. **Service name:** `tuya-backend`
3. **Build command:** `npm run build`
4. **Start command:** `npm start`

### 1.6 Add Environment Variables

Click "Variables" and add:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:M%40ussab2252026@db.pmeftbpnggkaocphbqcw.supabase.co:5432/postgres
JWT_SECRET=tuya-jwt-secret-key-2026-production-mode-secure-key-12345
GOOGLE_MAPS_API_KEY=AIzaSyDemoKeyForTUYA2026
SOCKET_IO_CORS_ORIGIN=https://tuya-app-sudan.vercel.app,https://tuya-driver-xxx.railway.app,https://tuya-admin-xxx.railway.app
LOG_LEVEL=info
```

### 1.7 Deploy

- Click "Deploy"
- Wait 5-10 minutes
- Get Backend URL (e.g., `https://tuya-backend-xxx.railway.app`)

---

## 🎯 Step 2: Deploy Driver App to Railway

### 2.1 Go to Railway Dashboard

### 2.2 Click "New Project"

### 2.3 Select "Deploy from GitHub repo"

### 2.4 Select Repository
- Repository: `tuya-platform`

### 2.5 Configure Driver App

1. **Select folder:** `apps/driver-app`
2. **Service name:** `tuya-driver-app`
3. **Build command:** `npm run build`
4. **Start command:** `npm start`

### 2.6 Add Environment Variables

```
NEXT_PUBLIC_API_URL=https://tuya-backend-xxx.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://tuya-backend-xxx.railway.app
NEXT_PUBLIC_APP_NAME=TUYA Driver
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

### 2.7 Deploy

- Click "Deploy"
- Wait 5-10 minutes
- Get Driver App URL

---

## 🎯 Step 3: Deploy Admin Dashboard to Railway

### 3.1 Go to Railway Dashboard

### 3.2 Click "New Project"

### 3.3 Select "Deploy from GitHub repo"

### 3.4 Select Repository
- Repository: `tuya-platform`

### 3.5 Configure Admin Dashboard

1. **Select folder:** `apps/admin-dashboard`
2. **Service name:** `tuya-admin-dashboard`
3. **Build command:** `npm run build`
4. **Start command:** `npm start`

### 3.6 Add Environment Variables

```
NEXT_PUBLIC_API_URL=https://tuya-backend-xxx.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://tuya-backend-xxx.railway.app
NEXT_PUBLIC_APP_NAME=TUYA Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

### 3.7 Deploy

- Click "Deploy"
- Wait 5-10 minutes
- Get Admin Dashboard URL

---

## 📊 Your URLs After Deployment

```
Backend: https://tuya-backend-xxx.railway.app
Driver App: https://tuya-driver-xxx.railway.app
Passenger App: https://tuya-app-sudan.vercel.app
Admin Dashboard: https://tuya-admin-xxx.railway.app
```

---

## 🧪 Step 4: Test Everything

### 4.1 Test Backend

```bash
curl https://tuya-backend-xxx.railway.app/health
```

Expected response: `{ "status": "ok" }`

### 4.2 Test Driver App

Open: `https://tuya-driver-xxx.railway.app`
- Should load
- Should show UI
- No console errors

### 4.3 Test Admin Dashboard

Open: `https://tuya-admin-xxx.railway.app`
- Should load
- Should show UI
- No console errors

### 4.4 Test Connections

- Open browser console (F12)
- Check for connection errors
- Verify Socket.io connects

---

## 🔧 Update CORS in Backend

After getting all URLs:

1. Go to Backend service in Railway
2. Update `SOCKET_IO_CORS_ORIGIN`:
```
https://tuya-app-sudan.vercel.app,https://tuya-driver-xxx.railway.app,https://tuya-admin-xxx.railway.app
```
3. Restart service

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Railway
- [ ] Driver App deployed on Railway
- [ ] Admin Dashboard deployed on Railway
- [ ] All 4 URLs obtained
- [ ] Backend health check passed
- [ ] All apps load in browser
- [ ] No console errors
- [ ] Socket.io connects
- [ ] CORS updated

---

## 📈 Next Steps

1. **Integration Testing**
   - Test all endpoints
   - Test real-time features
   - Verify everything works

2. **Bug Fixes**
   - Fix any issues found
   - Optimize performance

3. **UI Improvements**
   - Update ride tracking screen
   - Add vehicle images
   - Improve design

4. **Mobile App**
   - Build Flutter app
   - Connect to API

---

## 💡 Tips

### Redeploy Without Changes

1. Go to service in Railway
2. Click "Redeploy"

### View Logs

1. Go to service
2. Click "Logs"
3. See build/runtime logs

### Restart Service

1. Go to service
2. Click "Restart"

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Check service logs
- Check browser console (F12)

---

**Status: Ready for Railway Deployment** ✅

**Estimated Time: 30-45 minutes for all 3 services**

---

**Last Updated:** March 15, 2026
**Version:** 1.0.0
