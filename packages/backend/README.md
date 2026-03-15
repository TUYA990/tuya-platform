# TUYA Backend Server

Express.js + PostgreSQL + Socket.io backend for the TUYA ride-hailing application.

## Features

- ✅ User Authentication (JWT)
- ✅ Ride Management (Request, Accept, Track, Complete)
- ✅ Driver Management (Online/Offline, Location Tracking)
- ✅ Real-time Updates (Socket.io)
- ✅ Payment Processing
- ✅ Earnings Calculation

## Setup

### 1. Install Dependencies

```bash
cd packages/backend
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Setup Database

```bash
# Using Supabase
# 1. Create a new project at https://supabase.com
# 2. Get your connection string
# 3. Update DATABASE_URL in .env
# 4. Run migrations:
psql $DATABASE_URL < src/migrations/init.sql
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rides
- `POST /api/rides/request` - Request a ride
- `POST /api/rides/:id/accept` - Accept a ride
- `POST /api/rides/:id/start` - Start a ride
- `POST /api/rides/:id/complete` - Complete a ride
- `GET /api/rides/available` - Get available rides

### Drivers
- `GET /api/drivers/:id` - Get driver info
- `POST /api/drivers/online` - Go online
- `POST /api/drivers/offline` - Go offline
- `POST /api/drivers/location` - Update location

## Socket.io Events

### Client -> Server
- `driver:online` - Driver goes online
- `driver:offline` - Driver goes offline
- `ride:request` - Request a ride
- `ride:accept` - Accept a ride
- `location:update` - Update location

### Server -> Client
- `driver:status` - Driver status changed
- `ride:available` - New ride available
- `ride:accepted` - Ride accepted
- `location:changed` - Location updated

## Database Schema

See `src/migrations/init.sql` for the complete database schema.

## Deployment

### Railway

```bash
# Push to Railway
railway up
```

### Vercel (Serverless)

```bash
# Not recommended for WebSocket connections
```

## Environment Variables

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
SOCKET_IO_CORS_ORIGIN=http://localhost:3001,http://localhost:3002
```

## License

MIT
