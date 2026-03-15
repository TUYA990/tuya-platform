# TUYA - Final Deployment Checklist

## 🎯 Goal: Launch TUYA to Production

**Timeline:** 45 minutes to 24 hours (depending on manual steps)

---

## ✅ Phase 1: Supabase Setup (15 minutes)

### Step 1: Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Sign up / Login
- [ ] Click "New Project"
- [ ] Fill in details:
  - Name: `tuya-db`
  - Password: (create strong password)
  - Region: Europe or Middle East
- [ ] Wait for creation (5 minutes)

### Step 2: Initialize Database
- [ ] Go to SQL Editor
- [ ] Create new query
- [ ] Copy SQL from `/packages/backend/src/migrations/init.sql`
- [ ] Execute SQL
- [ ] Verify all 8 tables created

### Step 3: Get Connection String
- [ ] Go to Settings → Database
- [ ] Copy PostgreSQL Connection String
- [ ] Format: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`
- [ ] Save for Backend configuration

### Step 4: Test Connection
- [ ] Run: `psql [CONNECTION_STRING]`
- [ ] Query: `SELECT * FROM users LIMIT 1;`
- [ ] Verify connection works

**Status:** ✅ Supabase Ready

---

## ✅ Phase 2: Railway Deployment (15 minutes)

### Step 1: Create Railway Account
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Authorize Railway

### Step 2: Deploy Backend
**Option A: Using Railway CLI**
```bash
npm install -g @railway/cli
railway login
cd /home/ubuntu/tuya-monorepo/packages/backend
railway init
railway up
```

**Option B: Using GitHub**
- [ ] Push code to GitHub
- [ ] Connect Railway to GitHub repo
- [ ] Set root directory: `packages/backend`
- [ ] Deploy

### Step 3: Configure Environment Variables
In Railway dashboard, add:
```
PORT=4000
NODE_ENV=production
DATABASE_URL=[FROM_SUPABASE]
JWT_SECRET=[GENERATE_STRONG_SECRET]
GOOGLE_MAPS_API_KEY=[YOUR_API_KEY]
SOCKET_IO_CORS_ORIGIN=https://driver-app.vercel.app,https://passenger-app.vercel.app,https://admin-dashboard.vercel.app
```

### Step 4: Verify Deployment
- [ ] Get Railway URL from dashboard
- [ ] Test: `curl https://[RAILWAY_URL]/api/health`
- [ ] Verify response: `{ "status": "OK", ... }`
- [ ] Check logs for errors

**Status:** ✅ Backend Deployed

---

## ✅ Phase 3: Vercel Deployment (15 minutes per app)

### Driver App

#### Step 1: Prepare for Deployment
```bash
cd /home/ubuntu/tuya-monorepo/apps/driver-app
```

#### Step 2: Create .env.production
```
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
```

#### Step 3: Deploy to Vercel
**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**Option B: Using GitHub**
- [ ] Push to GitHub
- [ ] Go to https://vercel.com
- [ ] Import project
- [ ] Set environment variables
- [ ] Deploy

#### Step 4: Verify
- [ ] Get Vercel URL
- [ ] Open in browser
- [ ] Verify app loads
- [ ] Check console for errors

### Passenger App
- [ ] Repeat same steps for `apps/passenger-app`
- [ ] Get Vercel URL
- [ ] Verify deployment

### Admin Dashboard
- [ ] Repeat same steps for `apps/admin-dashboard`
- [ ] Get Vercel URL
- [ ] Verify deployment

**Status:** ✅ All Apps Deployed

---

## ✅ Phase 4: API Integration (10 minutes)

### Update Environment Variables

#### Driver App
- [ ] Update `.env.production` with Railway URL
- [ ] Redeploy to Vercel

#### Passenger App
- [ ] Update `.env.production` with Railway URL
- [ ] Redeploy to Vercel

#### Admin Dashboard
- [ ] Update `.env.production` with Railway URL
- [ ] Redeploy to Vercel

### Update Railway CORS
- [ ] Get all 3 Vercel URLs
- [ ] Update `SOCKET_IO_CORS_ORIGIN` in Railway
- [ ] Restart Railway service

**Status:** ✅ API Connected

---

## 🧪 Phase 5: Testing (10 minutes)

### Health Checks
- [ ] Test Backend health: `curl https://[RAILWAY_URL]/api/health`
- [ ] Test Driver App: Opens in browser
- [ ] Test Passenger App: Opens in browser
- [ ] Test Admin Dashboard: Opens in browser

### Functionality Tests
- [ ] Can load Driver App
- [ ] Can load Passenger App
- [ ] Can load Admin Dashboard
- [ ] Can see UI elements
- [ ] No console errors
- [ ] Socket.io connects
- [ ] API calls work

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] No API errors

**Status:** ✅ All Tests Passing

---

## 📊 Final Verification

### URLs to Save
```
Backend API: https://[RAILWAY_URL]
Driver App: https://[VERCEL_DRIVER_URL]
Passenger App: https://[VERCEL_PASSENGER_URL]
Admin Dashboard: https://[VERCEL_ADMIN_URL]
```

### Checklist
- [ ] All 3 apps deployed
- [ ] Backend deployed
- [ ] Database created
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Health checks passing
- [ ] All tests passing
- [ ] URLs documented

---

## 🚀 Launch!

### Share with Users
```
📱 Driver App: https://[VERCEL_DRIVER_URL]
👥 Passenger App: https://[VERCEL_PASSENGER_URL]
⚙️ Admin Dashboard: https://[VERCEL_ADMIN_URL]
```

### Monitor
- [ ] Check Railway logs daily
- [ ] Monitor Vercel analytics
- [ ] Track user feedback
- [ ] Fix bugs quickly

---

## 📈 Post-Launch

### Week 1
- [ ] Monitor for errors
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Optimize performance

### Week 2-4
- [ ] Add new features
- [ ] Improve UI/UX
- [ ] Scale infrastructure
- [ ] Plan next phase

---

## 💡 Important Notes

1. **Keep Secrets Safe**
   - Never commit `.env` files
   - Use environment variables
   - Rotate secrets regularly

2. **Monitor Costs**
   - Supabase: Free tier included
   - Railway: $5-20/month
   - Vercel: Free for hobby projects

3. **Backup Database**
   - Enable Supabase backups
   - Export data weekly
   - Keep backups secure

4. **Update Dependencies**
   - Check for security updates
   - Test before deploying
   - Keep changelog updated

---

## 🎉 Congratulations!

**TUYA is now live!**

You have successfully:
- ✅ Built a complete ride-hailing platform
- ✅ Deployed to production
- ✅ Connected all components
- ✅ Tested everything
- ✅ Launched to users

**Next steps:**
1. Gather user feedback
2. Fix bugs
3. Add new features
4. Scale infrastructure
5. Plan expansion

---

**Status: Ready for Launch** 🚀

**Time to celebrate!** 🎉
