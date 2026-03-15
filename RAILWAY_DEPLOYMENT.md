# Railway Deployment Guide

## 1. Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project

## 2. Deploy Backend

### Option A: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway init

# Deploy
railway up
```

### Option B: Using GitHub Integration

1. Push code to GitHub
2. Go to Railway dashboard
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Choose repository
6. Select `packages/backend` as root directory
7. Click "Deploy"

## 3. Setup Environment Variables

In Railway dashboard:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-strong-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
SOCKET_IO_CORS_ORIGIN=https://driver-app.vercel.app,https://passenger-app.vercel.app,https://admin-dashboard.vercel.app
```

## 4. Setup Database

### Option A: Use Railway PostgreSQL

1. In Railway dashboard, click "Add Service"
2. Select "PostgreSQL"
3. Railway will automatically set DATABASE_URL

### Option B: Use Supabase

1. Get connection string from Supabase
2. Add to Railway environment variables
3. Run migrations:
   ```bash
   railway run psql $DATABASE_URL < packages/backend/src/migrations/init.sql
   ```

## 5. Verify Deployment

```bash
# Get Railway URL
railway status

# Test API
curl https://your-railway-url/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-03-11T..."
}
```

## 6. Update Frontend Apps

Update `.env.local` in each app:

```
NEXT_PUBLIC_API_URL=https://your-railway-url
NEXT_PUBLIC_SOCKET_URL=wss://your-railway-url
```

## 7. Deploy Frontend Apps

### Driver App

```bash
cd apps/driver-app
vercel deploy --prod
```

### Passenger App

```bash
cd apps/passenger-app
vercel deploy --prod
```

### Admin Dashboard

```bash
cd apps/admin-dashboard
vercel deploy --prod
```

## 8. Update CORS

In Railway environment variables, update:

```
SOCKET_IO_CORS_ORIGIN=https://driver-app-xxx.vercel.app,https://passenger-app-xxx.vercel.app,https://admin-dashboard-xxx.vercel.app
```

## 9. Monitor Deployment

```bash
# View logs
railway logs

# View status
railway status

# View environment
railway env
```

## Troubleshooting

### Build Failed
- Check `package.json` in root
- Ensure `packages/backend` is correct
- Check Node.js version compatibility

### Database Connection Error
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Verify firewall settings

### CORS Error
- Update SOCKET_IO_CORS_ORIGIN
- Restart Railway service
- Clear browser cache

## Cost

- **Free Tier:** $5 credit/month
- **PostgreSQL:** Included in free tier
- **Bandwidth:** 100GB/month free

## Next Steps

1. ✅ Test all API endpoints
2. ✅ Monitor logs for errors
3. ✅ Setup error tracking (Sentry)
4. ✅ Setup monitoring (Datadog)
5. ✅ Setup backups

## Useful Commands

```bash
# View all services
railway service

# Switch service
railway service --select

# View logs
railway logs -f

# Run command
railway run npm test

# Redeploy
railway redeploy
```

## Rollback

If deployment fails:

```bash
# View deployment history
railway deployments

# Rollback to previous version
railway rollback [deployment-id]
```
