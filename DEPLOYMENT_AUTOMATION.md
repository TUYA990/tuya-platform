# 🚀 TUYA Deployment Automation Guide

**Status:** Starting Production Deployment
**Timeline:** 60 minutes total

---

## 📋 Phase 1: Supabase Database Setup (15 minutes)

### Step 1.1: Create Supabase Project

**Manual Steps:**
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: `tuya-db`
   - Database Password: (create strong password - save it!)
   - Region: Select closest to Sudan (Europe or Middle East)
4. Click "Create new project"
5. Wait 5 minutes for creation

**After project is created:**
- Go to Settings → Database
- Copy PostgreSQL Connection String
- Format: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

### Step 1.2: Initialize Database Schema

**SQL to execute:**
1. Go to SQL Editor in Supabase
2. Create new query
3. Copy entire content from: `/home/ubuntu/tuya-monorepo/packages/backend/src/migrations/init.sql`
4. Execute the SQL
5. Verify all 8 tables are created:
   - users
   - drivers
   - passengers
   - rides
   - payments
   - vehicles
   - driver_documents
   - ride_locations
   - ratings
   - wallet_transactions

### Step 1.3: Enable Row Level Security (RLS)

In Supabase:
1. Go to Authentication → Policies
2. Enable RLS on all tables
3. Create policies for each table

### Step 1.4: Test Connection

```bash
# Test database connection
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" -c "SELECT version();"
```

Expected output: PostgreSQL version info

---

## 📋 Phase 2: Railway Backend Deployment (15 minutes)

### Step 2.1: Prepare Backend for Deployment

```bash
cd /home/ubuntu/tuya-monorepo/packages/backend

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Set project name
# Select: Create a new project
# Name: tuya-backend
```

### Step 2.2: Configure Environment Variables

Create `.env` file in `packages/backend/`:

```bash
cat > /home/ubuntu/tuya-monorepo/packages/backend/.env << 'EOF'
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-here-12345678
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
SOCKET_IO_CORS_ORIGIN=https://driver-app-xxx.vercel.app,https://passenger-app-xxx.vercel.app,https://admin-dashboard-xxx.vercel.app
LOG_LEVEL=info
REDIS_URL=redis://localhost:6379
EOF
```

### Step 2.3: Deploy to Railway

```bash
cd /home/ubuntu/tuya-monorepo/packages/backend

# Deploy
railway up

# Get deployment URL
railway status

# View logs
railway logs -f
```

### Step 2.4: Verify Backend Deployment

```bash
# Test health endpoint
curl https://[RAILWAY_URL]/api/health

# Expected response:
# {
#   "status": "OK",
#   "timestamp": "2026-03-12T...",
#   "uptime": 123.45,
#   "environment": "production"
# }
```

---

## 📋 Phase 3: Vercel Frontend Deployment (45 minutes)

### Step 3.1: Prepare Environment Variables

Create `.env.production` in each app:

#### Driver App
```bash
cat > /home/ubuntu/tuya-monorepo/apps/driver-app/.env.production << 'EOF'
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Driver
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF
```

#### Passenger App
```bash
cat > /home/ubuntu/tuya-monorepo/apps/passenger-app/.env.production << 'EOF'
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Passenger
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF
```

#### Admin Dashboard
```bash
cat > /home/ubuntu/tuya-monorepo/apps/admin-dashboard/.env.production << 'EOF'
NEXT_PUBLIC_API_URL=https://[RAILWAY_URL]
NEXT_PUBLIC_SOCKET_URL=wss://[RAILWAY_URL]
NEXT_PUBLIC_APP_NAME=TUYA Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF
```

### Step 3.2: Deploy Driver App

```bash
cd /home/ubuntu/tuya-monorepo/apps/driver-app

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project or create new
# - Set project name: tuya-driver-app
# - Framework: Next.js
# - Root directory: ./
# - Build command: npm run build
# - Output directory: .next
```

### Step 3.3: Deploy Passenger App

```bash
cd /home/ubuntu/tuya-monorepo/apps/passenger-app

# Deploy
vercel --prod

# Follow prompts:
# - Project name: tuya-passenger-app
# - Rest same as above
```

### Step 3.4: Deploy Admin Dashboard

```bash
cd /home/ubuntu/tuya-monorepo/apps/admin-dashboard

# Deploy
vercel --prod

# Follow prompts:
# - Project name: tuya-admin-dashboard
# - Rest same as above
```

### Step 3.5: Get Vercel URLs

After each deployment, Vercel will show:
```
✓ Production: https://tuya-driver-app-xxx.vercel.app
✓ Production: https://tuya-passenger-app-xxx.vercel.app
✓ Production: https://tuya-admin-dashboard-xxx.vercel.app
```

Save these URLs!

---

## 📋 Phase 4: Integration and Testing (10 minutes)

### Step 4.1: Update Railway CORS Settings

In Railway dashboard:
1. Go to your project
2. Click "Variables"
3. Update `SOCKET_IO_CORS_ORIGIN`:
```
https://tuya-driver-app-xxx.vercel.app,https://tuya-passenger-app-xxx.vercel.app,https://tuya-admin-dashboard-xxx.vercel.app
```
4. Restart service

### Step 4.2: Test Backend Health

```bash
curl https://[RAILWAY_URL]/api/health

# Expected:
# {
#   "status": "OK",
#   "timestamp": "2026-03-12T10:30:45.123Z",
#   "uptime": 234.56,
#   "environment": "production"
# }
```

### Step 4.3: Test API Endpoints

```bash
# Test drivers endpoint
curl https://[RAILWAY_URL]/api/drivers

# Test passengers endpoint
curl https://[RAILWAY_URL]/api/passengers

# Test rides endpoint
curl https://[RAILWAY_URL]/api/rides
```

### Step 4.4: Test Frontend Apps

1. Open Driver App: https://tuya-driver-app-xxx.vercel.app
   - Should load without errors
   - Check browser console (F12)
   - Should see no CORS errors

2. Open Passenger App: https://tuya-passenger-app-xxx.vercel.app
   - Should load without errors
   - Check browser console (F12)
   - Should see no CORS errors

3. Open Admin Dashboard: https://tuya-admin-dashboard-xxx.vercel.app
   - Should load without errors
   - Check browser console (F12)
   - Should see no CORS errors

### Step 4.5: Test Socket.io Connection

In browser console of any app:
```javascript
// Should see Socket.io connected message
// Check Network tab → WS for WebSocket connection
```

---

## 📋 Phase 5: Final Verification

### Checklist

- [ ] Supabase database created
- [ ] All 8 tables initialized
- [ ] Connection string working
- [ ] Railway backend deployed
- [ ] Backend health endpoint responding
- [ ] All API endpoints working
- [ ] Driver App deployed to Vercel
- [ ] Passenger App deployed to Vercel
- [ ] Admin Dashboard deployed to Vercel
- [ ] All apps loading without errors
- [ ] No CORS errors in console
- [ ] Socket.io connected
- [ ] Environment variables set
- [ ] CORS configured

---

## 🎯 Production URLs

```
Backend API: https://[RAILWAY_URL]
Driver App: https://tuya-driver-app-xxx.vercel.app
Passenger App: https://tuya-passenger-app-xxx.vercel.app
Admin Dashboard: https://tuya-admin-dashboard-xxx.vercel.app
Database: Supabase (PostgreSQL)
```

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] DATABASE_URL is secure
- [ ] CORS_ORIGIN is correct
- [ ] HTTPS is enabled (automatic on Railway/Vercel)
- [ ] Rate limiting enabled
- [ ] Input validation enabled
- [ ] SQL injection protection enabled
- [ ] Helmet security headers enabled

---

## 📊 Monitoring

### Railway Logs
```bash
railway logs -f
```

### Vercel Logs
1. Go to Vercel dashboard
2. Select project
3. Click "Deployments"
4. Click latest deployment
5. View logs

### Database Monitoring
1. Go to Supabase dashboard
2. Click "Monitoring"
3. Check query performance
4. Monitor connections

---

## 🚨 Troubleshooting

### Backend won't deploy
- Check logs: `railway logs`
- Verify package.json is correct
- Check Node version compatibility

### CORS errors
- Update SOCKET_IO_CORS_ORIGIN in Railway
- Restart Railway service
- Clear browser cache

### Database connection error
- Verify DATABASE_URL is correct
- Check Supabase is running
- Verify firewall settings

### Frontend apps won't load
- Check Vercel logs
- Verify environment variables
- Check API URL is correct

---

## 📈 Next Steps After Launch

### Week 1
- Monitor for errors
- Collect user feedback
- Fix critical bugs
- Optimize performance

### Week 2-4
- Add new features
- Improve UI/UX
- Scale infrastructure
- Plan next phase

---

**Status: Ready for Deployment** 🚀

**Let's launch TUYA!** 🎉
