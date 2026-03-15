# 🚀 TUYA - Deploy Now! (Complete Automation Guide)

**Status:** Ready for Production Deployment
**Timeline:** 60 minutes total
**Automation Level:** 90% automated with scripts

---

## 📋 Quick Start

### Option 1: Automated Deployment (Recommended)

Run the deployment scripts in order:

```bash
cd /home/ubuntu/tuya-monorepo

# Step 1: Supabase Setup (15 minutes)
./scripts/01-supabase-setup.sh

# Step 2: Railway Deployment (15 minutes)
./scripts/02-railway-deploy.sh

# Step 3: Vercel Deployment (15 minutes)
./scripts/03-vercel-deploy.sh

# Step 4: Integration Testing (10 minutes)
./scripts/04-integration-test.sh
```

### Option 2: Manual Deployment

Follow the detailed guide in `DEPLOYMENT_AUTOMATION.md`

---

## 🎯 Phase 1: Supabase Setup (15 minutes)

### What This Script Does:
- Guides you through creating a Supabase project
- Helps you initialize the database schema
- Tests the database connection
- Saves connection string to `.env.production`

### How to Run:
```bash
./scripts/01-supabase-setup.sh
```

### What You Need:
- Supabase account (https://supabase.com)
- Strong database password
- Ability to copy/paste SQL

### What You'll Get:
- PostgreSQL database
- All 8 tables initialized
- Connection string saved

---

## 🎯 Phase 2: Railway Deployment (15 minutes)

### What This Script Does:
- Installs Railway CLI
- Logs you into Railway
- Deploys backend to Railway
- Sets environment variables
- Tests backend health
- Saves Railway URL

### How to Run:
```bash
./scripts/02-railway-deploy.sh
```

### What You Need:
- Railway account (https://railway.app)
- GitHub account (for authentication)
- Railway CLI will be installed automatically

### What You'll Get:
- Running backend server
- Health endpoint responding
- Railway URL for frontend apps

---

## 🎯 Phase 3: Vercel Deployment (15 minutes)

### What This Script Does:
- Installs Vercel CLI
- Updates environment variables
- Deploys Driver App to Vercel
- Deploys Passenger App to Vercel
- Deploys Admin Dashboard to Vercel

### How to Run:
```bash
./scripts/03-vercel-deploy.sh
```

### What You Need:
- Vercel account (https://vercel.com)
- GitHub account (for authentication)
- Vercel CLI will be installed automatically
- Railway URL (from Phase 2)

### What You'll Get:
- 3 deployed frontend apps
- Live URLs for each app
- Environment variables configured

---

## 🎯 Phase 4: Integration Testing (10 minutes)

### What This Script Does:
- Tests backend health endpoint
- Tests all API endpoints
- Tests frontend apps
- Tests CORS configuration
- Tests WebSocket connection
- Measures response times

### How to Run:
```bash
./scripts/04-integration-test.sh
```

### What You Need:
- All URLs from previous phases
- Internet connection

### What You'll Get:
- Verification that everything works
- Performance metrics
- Troubleshooting guidance if needed

---

## 📊 Environment Files Created

The scripts automatically create these files:

### Backend
- `.env.production` - Backend environment variables

### Frontend
- `apps/driver-app/.env.production` - Driver app environment
- `apps/passenger-app/.env.production` - Passenger app environment
- `apps/admin-dashboard/.env.production` - Admin dashboard environment

---

## 🔧 Manual Configuration (If Needed)

### Supabase Connection String Format
```
postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
```

### Railway Environment Variables
```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
SOCKET_IO_CORS_ORIGIN=https://driver-app.vercel.app,https://passenger-app.vercel.app,https://admin-dashboard.vercel.app
```

### Vercel Environment Variables
```
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
```

---

## 🧪 Testing Checklist

After all scripts complete:

- [ ] Backend health endpoint responds
- [ ] All API endpoints working
- [ ] Driver App loads in browser
- [ ] Passenger App loads in browser
- [ ] Admin Dashboard loads in browser
- [ ] No CORS errors in console
- [ ] Socket.io connects
- [ ] Response time < 1 second

---

## 🚨 Troubleshooting

### Supabase Issues
```bash
# Test database connection
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" -c "SELECT version();"
```

### Railway Issues
```bash
# View logs
railway logs -f

# Restart service
railway restart

# Check status
railway status
```

### Vercel Issues
```bash
# Check deployment logs in dashboard
# https://vercel.com/dashboard

# Redeploy
vercel --prod
```

### CORS Errors
1. Update `SOCKET_IO_CORS_ORIGIN` in Railway
2. Restart Railway service
3. Clear browser cache
4. Test again

---

## 📈 After Deployment

### Week 1
- Monitor logs for errors
- Collect user feedback
- Fix critical bugs
- Optimize performance

### Week 2-4
- Add new features
- Improve UI/UX
- Scale infrastructure
- Plan next phase

---

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Express.js Docs:** https://expressjs.com
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎯 Success Criteria

✅ All scripts complete without errors
✅ Backend health endpoint responds
✅ All 3 frontend apps load
✅ No CORS errors
✅ Socket.io connects
✅ API endpoints working
✅ Response time acceptable
✅ Database connected

---

## 🎉 You're Ready!

Everything is automated and ready to go!

**Start with:**
```bash
cd /home/ubuntu/tuya-monorepo
./scripts/01-supabase-setup.sh
```

**Then follow the prompts for each script.**

---

## 📊 Timeline

| Phase | Time | Status |
|-------|------|--------|
| Supabase | 15 min | ⏳ Pending |
| Railway | 15 min | ⏳ Pending |
| Vercel | 15 min | ⏳ Pending |
| Testing | 10 min | ⏳ Pending |
| **Total** | **55 min** | ⏳ Pending |

---

**Let's launch TUYA!** 🚀🎉

---

**Last Updated:** March 12, 2026
**Version:** 1.0.0
**Status:** Ready for Production
