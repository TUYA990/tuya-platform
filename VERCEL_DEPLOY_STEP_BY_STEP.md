# 🚀 Vercel Deployment - Step by Step Guide

**Status:** Ready to Deploy
**Time:** 15-20 minutes per app
**Total:** 45-60 minutes for all 3 apps

---

## 📋 What You Need

- ✅ Vercel Account (https://vercel.com)
- ✅ GitHub Account with code pushed
- ✅ Railway Backend URL (optional for now)
- ✅ 3 Next.js Apps ready

---

## 🎯 Step 1: Deploy Driver App

### 1.1 Go to Vercel Dashboard

```
https://vercel.com/dashboard
```

### 1.2 Click "Add New"

Look for button in top-right corner

### 1.3 Select "Project"

### 1.4 Click "Import Git Repository"

### 1.5 Select Your GitHub Account

- Click your GitHub account
- Authorize Vercel if needed

### 1.6 Find Your Repository

- Search for: `tuya-platform`
- Click "Import"

### 1.7 Configure Project

**Fill in these fields:**

| Field | Value |
|-------|-------|
| Project Name | `tuya-driver-app` |
| Framework | Next.js |
| Root Directory | `apps/driver-app` |
| Build Command | `npm run build` |
| Output Directory | `.next` |

### 1.8 Add Environment Variables

Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL = https://placeholder.railway.app
NEXT_PUBLIC_SOCKET_URL = wss://placeholder.railway.app
NEXT_PUBLIC_APP_NAME = TUYA Driver
NEXT_PUBLIC_APP_VERSION = 1.0.0
NEXT_PUBLIC_ENVIRONMENT = production
```

**Note:** Use placeholder URLs for now. You can update them later.

### 1.9 Click "Deploy"

- Wait for build (5-10 minutes)
- You'll see: "Congratulations! Your project has been successfully deployed"

### 1.10 Get Your URL

- Copy the URL shown (e.g., `https://tuya-driver-app-xxx.vercel.app`)
- Save it

---

## 🎯 Step 2: Deploy Passenger App

### Repeat the same steps as Driver App:

**But change these:**

| Field | Value |
|-------|-------|
| Project Name | `tuya-passenger-app` |
| Root Directory | `apps/passenger-app` |
| NEXT_PUBLIC_APP_NAME | TUYA Passenger |

---

## 🎯 Step 3: Deploy Admin Dashboard

### Repeat the same steps as Driver App:

**But change these:**

| Field | Value |
|-------|-------|
| Project Name | `tuya-admin-dashboard` |
| Root Directory | `apps/admin-dashboard` |
| NEXT_PUBLIC_APP_NAME | TUYA Admin |

---

## 📊 Your Vercel URLs

After all 3 deployments, you'll have:

```
Driver App: https://tuya-driver-app-xxx.vercel.app
Passenger App: https://tuya-passenger-app-xxx.vercel.app
Admin Dashboard: https://tuya-admin-dashboard-xxx.vercel.app
```

---

## 🧪 Step 4: Test Your Apps

### 4.1 Open Each App

1. Driver App: `https://tuya-driver-app-xxx.vercel.app`
2. Passenger App: `https://tuya-passenger-app-xxx.vercel.app`
3. Admin Dashboard: `https://tuya-admin-dashboard-xxx.vercel.app`

### 4.2 Check for Errors

Press `F12` to open Developer Console

Look for:
- ✅ No red errors
- ✅ No CORS errors
- ✅ Page loads correctly

### 4.3 Expected Behavior

- App should load
- UI should be visible
- No console errors (some warnings are OK)

---

## 🔧 Updating Environment Variables Later

### If you need to update URLs:

1. Go to Project Settings
2. Click "Environment Variables"
3. Edit the values
4. Click "Save"
5. Go to "Deployments"
6. Click "..." on latest deployment
7. Click "Redeploy"

---

## 📈 Troubleshooting

### Build Failed

**Check logs:**
1. Go to Deployments
2. Click failed deployment
3. Scroll down to see error
4. Fix the issue
5. Redeploy

**Common issues:**
- Missing dependencies
- Wrong root directory
- TypeScript errors
- Missing environment variables

### App Shows Blank Page

- Check browser console (F12)
- Look for errors
- Verify environment variables
- Check if API URL is correct

### CORS Errors

- These will appear in console
- Means backend isn't configured yet
- Normal for now
- Will be fixed when backend is deployed

### Socket.io Not Connecting

- Check console for errors
- Verify SOCKET_URL is correct
- Normal if backend isn't deployed yet
- Will work after backend deployment

---

## ✅ Deployment Checklist

- [ ] Driver App deployed
- [ ] Passenger App deployed
- [ ] Admin Dashboard deployed
- [ ] All 3 apps load in browser
- [ ] No critical errors in console
- [ ] URLs saved

---

## 📝 Save Your URLs

```
Driver App: ______________________________
Passenger App: ______________________________
Admin Dashboard: ______________________________
```

---

## 🎯 Next Steps

1. **Update Environment Variables** (when you have Railway URL)
2. **Deploy Backend to Railway**
3. **Update CORS settings in Railway**
4. **Run Integration Tests**
5. **Fix any issues**

---

## 💡 Tips

### Redeploy Without Changes

1. Go to Deployments
2. Click "..." on latest
3. Click "Redeploy"

### Rollback to Previous Version

1. Go to Deployments
2. Find previous version
3. Click "..." 
4. Click "Promote to Production"

### View Logs

1. Go to Deployments
2. Click latest deployment
3. Scroll to see build logs

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Check deployment logs in dashboard
- Check browser console for errors

---

**Status: Ready for Vercel Deployment** ✅

**Estimated Time: 45-60 minutes** ⏱️

---

**Last Updated:** March 12, 2026
**Version:** 1.0.0
