# Supabase Database Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in project details:
   - **Name:** tuya-db
   - **Database Password:** (strong password)
   - **Region:** Choose closest to Sudan (Europe or Middle East)
4. Click "Create new project"

## 2. Get Connection String

1. Go to Project Settings → Database
2. Copy the connection string (PostgreSQL)
3. Add to `.env` file:
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
   ```

## 3. Initialize Database

1. Go to SQL Editor in Supabase
2. Copy content from `packages/backend/src/migrations/init.sql`
3. Paste into SQL Editor
4. Click "Run"

## 4. Verify Tables

Check that these tables are created:
- ✅ users
- ✅ drivers
- ✅ passengers
- ✅ rides
- ✅ payments

## 5. Setup Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);
```

## 6. Test Connection

Run this in Backend:
```bash
npm run dev
```

You should see:
```
✅ Server running on port 4000
📍 API: http://localhost:4000/api
🔌 Socket.io: ws://localhost:4000
```

## Environment Variables

```
DATABASE_URL=postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
SOCKET_IO_CORS_ORIGIN=http://localhost:3001,http://localhost:3002,http://localhost:3003
```

## Next Steps

1. ✅ Test API endpoints
2. ✅ Connect Frontend apps
3. ✅ Deploy to Railway
