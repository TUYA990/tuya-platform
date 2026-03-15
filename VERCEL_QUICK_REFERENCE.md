# 🚀 Vercel Deployment - Quick Reference

---

## ⚡ 3 Apps to Deploy

### 1️⃣ Driver App
- **Project Name:** `tuya-driver-app`
- **Root Directory:** `apps/driver-app`
- **App Name:** TUYA Driver

### 2️⃣ Passenger App
- **Project Name:** `tuya-passenger-app`
- **Root Directory:** `apps/passenger-app`
- **App Name:** TUYA Passenger

### 3️⃣ Admin Dashboard
- **Project Name:** `tuya-admin-dashboard`
- **Root Directory:** `apps/admin-dashboard`
- **App Name:** TUYA Admin

---

## 📋 Environment Variables (All Apps)

```
NEXT_PUBLIC_API_URL=https://placeholder.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://placeholder.railway.app
NEXT_PUBLIC_APP_NAME=[App Name]
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## 🎯 Deployment Steps (Same for All 3)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select your GitHub account
5. Select `tuya-platform` repository
6. Fill in Project Name, Root Directory
7. Add Environment Variables
8. Click "Deploy"
9. Wait 5-10 minutes
10. Copy URL

---

## 📊 Expected URLs

```
Driver: https://tuya-driver-app-xxx.vercel.app
Passenger: https://tuya-passenger-app-xxx.vercel.app
Admin: https://tuya-admin-dashboard-xxx.vercel.app
```

---

## ✅ Verification

- [ ] All 3 apps deployed
- [ ] All 3 apps load in browser
- [ ] No critical errors
- [ ] URLs saved

---

## 🔧 Update URLs Later

1. Project Settings → Environment Variables
2. Edit values
3. Save
4. Deployments → Redeploy

---

## 📞 Help

- Vercel Docs: https://vercel.com/docs
- Check deployment logs
- Check browser console (F12)

---

**Time: 45-60 minutes**
**Status: Ready**
