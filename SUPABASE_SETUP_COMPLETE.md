# Supabase Setup Instructions

## ⏱️ Time: 15 minutes

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in the form:
   - **Name:** tuya-db
   - **Database Password:** (create a strong password)
   - **Region:** Europe (Frankfurt) or Middle East (if available)
4. Wait for project creation (5 minutes)

### Step 2: Get Connection String

1. In Supabase dashboard, go to **Settings → Database**
2. Copy the **PostgreSQL Connection String**
3. It should look like:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   ```
4. Save it for later

### Step 3: Initialize Database

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from:
   ```
   /home/ubuntu/tuya-monorepo/packages/backend/src/migrations/init.sql
   ```
4. Paste it into the SQL editor
5. Click **Run**
6. Verify all tables are created

### Step 4: Create Tables (Alternative if SQL doesn't work)

If SQL import fails, create tables manually:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  license_number VARCHAR(255) UNIQUE NOT NULL,
  vehicle_type VARCHAR(100),
  rating DECIMAL(3, 2) DEFAULT 5.0,
  total_rides INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  is_online BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  last_location_update TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Passengers table
CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  wallet_balance DECIMAL(10, 2) DEFAULT 0,
  total_rides INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rides table
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id UUID NOT NULL REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  pickup_location VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  distance DECIMAL(10, 2),
  duration INTEGER,
  fare DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id),
  passenger_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  method VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  transaction_id VARCHAR(255),
  payment_provider VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id),
  rater_id UUID NOT NULL REFERENCES users(id),
  ratee_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ride locations table
CREATE TABLE ride_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet transactions table
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  reference_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_drivers_user_id ON drivers(user_id);
CREATE INDEX idx_drivers_is_online ON drivers(is_online);
CREATE INDEX idx_passengers_user_id ON passengers(user_id);
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_payments_ride_id ON payments(ride_id);
CREATE INDEX idx_ratings_ride_id ON ratings(ride_id);
CREATE INDEX idx_ride_locations_ride_id ON ride_locations(ride_id);
CREATE INDEX idx_wallet_transactions_user_id ON wallet_transactions(user_id);
```

### Step 5: Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
```

### Step 6: Test Connection

```bash
# Install psql if not available
sudo apt-get install postgresql-client

# Test connection
psql postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres

# Run a test query
SELECT * FROM users LIMIT 1;
```

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Connection string obtained
- [ ] Database tables created
- [ ] All 8 tables exist
- [ ] Indexes created
- [ ] Connection test successful
- [ ] Can query tables

---

## 🔗 Connection String Format

```
postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
```

**Example:**
```
postgresql://postgres:MyPassword123@db.supabase.co:5432/postgres
```

---

## 📝 Environment Variables for Backend

Add to `.env`:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
NODE_ENV=production
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_MAPS_API_KEY=your-google-maps-key
SOCKET_IO_CORS_ORIGIN=http://localhost:3001,http://localhost:3002,http://localhost:3003
```

---

## 🚀 Next Steps

1. ✅ Supabase setup complete
2. ⏳ Update Backend .env
3. ⏳ Deploy to Railway
4. ⏳ Connect Frontend apps

---

**Status: Ready for Backend Integration** ✅
