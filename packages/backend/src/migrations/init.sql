-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('driver', 'passenger', 'admin')),
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR(255) UNIQUE NOT NULL,
  vehicle_type VARCHAR(100),
  vehicle_number VARCHAR(100),
  rating DECIMAL(3, 2) DEFAULT 5.0,
  total_rides INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  is_online BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  last_location_update TIMESTAMP,
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  vehicle_type VARCHAR(100) NOT NULL,
  vehicle_number VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(50),
  year INTEGER,
  registration_date DATE,
  insurance_expiry DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create driver_documents table
CREATE TABLE IF NOT EXISTS driver_documents (
  id UUID PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL CHECK (document_type IN ('license', 'insurance', 'registration', 'inspection')),
  document_url VARCHAR(255) NOT NULL,
  expiry_date DATE,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create passengers table
CREATE TABLE IF NOT EXISTS passengers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  wallet_balance DECIMAL(10, 2) DEFAULT 0,
  total_rides INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id UUID PRIMARY KEY,
  passenger_id UUID NOT NULL REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  pickup_location VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  distance DECIMAL(10, 2),
  duration INTEGER,
  fare DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ride_locations table
CREATE TABLE IF NOT EXISTS ride_locations (
  id UUID PRIMARY KEY,
  ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  ride_id UUID NOT NULL REFERENCES rides(id),
  passenger_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  method VARCHAR(50) NOT NULL CHECK (method IN ('cash', 'wallet', 'card')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id VARCHAR(255),
  payment_provider VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY,
  ride_id UUID NOT NULL REFERENCES rides(id),
  rater_id UUID NOT NULL REFERENCES users(id),
  ratee_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('credit', 'debit')),
  description VARCHAR(255),
  reference_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON drivers(user_id);
CREATE INDEX IF NOT EXISTS idx_drivers_is_online ON drivers(is_online);
CREATE INDEX IF NOT EXISTS idx_vehicles_driver_id ON vehicles(driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_documents_driver_id ON driver_documents(driver_id);
CREATE INDEX IF NOT EXISTS idx_passengers_user_id ON passengers(user_id);
CREATE INDEX IF NOT EXISTS idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX IF NOT EXISTS idx_rides_driver_id ON rides(driver_id);
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);
CREATE INDEX IF NOT EXISTS idx_ride_locations_ride_id ON ride_locations(ride_id);
CREATE INDEX IF NOT EXISTS idx_payments_ride_id ON payments(ride_id);
CREATE INDEX IF NOT EXISTS idx_ratings_ride_id ON ratings(ride_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
