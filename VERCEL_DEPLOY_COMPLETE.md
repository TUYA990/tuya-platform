# 🚀 Vercel Deployment - Complete Guide

**Status:** Ready to Deploy
**Time:** 15-20 minutes per app (45 minutes total)
**Apps:** 3 (Driver App, Passenger App, Admin Dashboard)

---

## 📋 Prerequisites

- ✅ Vercel account (https://vercel.com)
- ✅ GitHub account with code pushed
- ✅ Railway URL (from backend deployment)
- ✅ Supabase Connection String

---

## 🎯 Step 1: Prepare Environment Variables

### 1.1 Driver App

Create `.env.production` in `apps/driver-app/`:

```
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Driver
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

### 1.2 Passenger App

Create `.env.production` in `apps/passenger-app/`:

```
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Passenger
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

### 1.3 Admin Dashboard

Create `.env.production` in `apps/admin-dashboard/`:

```
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## 🎯 Step 2: Deploy Driver App

### 2.1 Go to Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..."
3. Select "Project"

### 2.2 Import Project

1. Click "Import Git Repository"
2. Select your GitHub account
3. Find: `tuya-platform`
4. Click "Import"

### 2.3 Configure Project

1. **Project Name:** `tuya-driver-app`
2. **Framework Preset:** Next.js
3. **Root Directory:** `apps/driver-app`
4. **Build Command:** `npm run build`
5. **Output Directory:** `.next`

### 2.4 Add Environment Variables

1. Click "Environment Variables"
2. Add:
   - `NEXT_PUBLIC_API_URL` = `https://[RAILWAY_URL]`
   - `NEXT_PUBLIC_SOCKET_URL` = `wss://[RAILWAY_URL]`
   - `NEXT_PUBLIC_APP_NAME` = `TUYA Driver`
   - `NEXT_PUBLIC_APP_VERSION` = `1.0.0`
   - `NEXT_PUBLIC_ENVIRONMENT` = `production`

### 2.5 Deploy

1. Click "Deploy"
2. Wait for build (5-10 minutes)
3. Get URL when complete

---

## 🎯 Step 3: Deploy Passenger App

### Repeat same steps as Driver App:

1. **Project Name:** `tuya-passenger-app`
2. **Root Directory:** `apps/passenger-app`
3. **Environment Variables:** Same as above but `NEXT_PUBLIC_APP_NAME` = `TUYA Passenger`
4. **Deploy**

---

## 🎯 Step 4: Deploy Admin Dashboard

### Repeat same steps as Driver App:

1. **Project Name:** `tuya-admin-dashboard`
2. **Root Directory:** `apps/admin-dashboard`
3. **Environment Variables:** Same as above but `NEXT_PUBLIC_APP_NAME` = `TUYA Admin`
4. **Deploy**

---

## 📊 Deployment URLs

After all deployments, you'll have:

```
Driver App: https://tuya-driver-app-xxx.vercel.app
Passenger App: https://tuya-passenger-app-xxx.vercel.app
Admin Dashboard: https://tuya-admin-dashboard-xxx.vercel.app
```

---

## 🧪 Step 5: Test Deployments

### 5.1 Test Driver App

1. Open: `https://tuya-driver-app-xxx.vercel.app`
2. Check:
   - [ ] Page loads
   - [ ] No console errors
   - [ ] No CORS errors
   - [ ] Socket.io connects

### 5.2 Test Passenger App

1. Open: `https://tuya-passenger-app-xxx.vercel.app`
2. Check:
   - [ ] Page loads
   - [ ] No console errors
   - [ ] No CORS errors
   - [ ] Socket.io connects

### 5.3 Test Admin Dashboard

1. Open: `https://tuya-admin-dashboard-xxx.vercel.app`
2. Check:
   - [ ] Page loads
   - [ ] No console errors
   - [ ] No CORS errors
   - [ ] Socket.io connects

---

## 🔧 Troubleshooting

### Build Failed
- Check logs in Vercel dashboard
- Verify `package.json` is correct
- Check Node version compatibility
- Verify root directory is correct

### CORS Errors
- Update `SOCKET_IO_CORS_ORIGIN` in Railway
- Restart Railway service
- Clear browser cache
- Test again

### Socket.io Not Connecting
- Verify `NEXT_PUBLIC_SOCKET_URL` is correct
- Check Railway is running
- Verify CORS is configured
- Check network tab in browser

### Environment Variables Not Loading
- Verify variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names (case-sensitive)
- Verify they start with `NEXT_PUBLIC_`

---

## ✅ Deployment Checklist

- [ ] Environment files created
- [ ] Driver App deployed
- [ ] Passenger App deployed
- [ ] Admin Dashboard deployed
- [ ] All apps load in browser
- [ ] No console errors
- [ ] No CORS errors
- [ ] Socket.io connects
- [ ] URLs saved

---

## 📈 Next Steps

1. **Update Railway CORS**
   - Add all 3 Vercel URLs
   - Restart Railway service

2. **Integration Testing**
   - Test all endpoints
   - Test real-time features
   - Verify everything works

3. **Bug Fixes**
   - Fix any issues found
   - Optimize performance
   - Improve UI/UX

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Check Vercel dashboard logs
- Check browser console for errors

---

**Status: Ready for Vercel Deployment** ✅

**Next: Integration Testing** 🧪

---

**Last Updated:** March 12, 2026
**Version:** 1.0.0
