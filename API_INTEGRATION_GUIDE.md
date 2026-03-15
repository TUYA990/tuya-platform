# API Integration Guide

## Backend URL

```
Development: http://localhost:4000
Production: https://tuya-backend.railway.app (after deployment)
```

## Update Environment Variables

### Driver App (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

### Passenger App (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

### Admin Dashboard (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

## API Client Setup

### Update packages/api/src/client.ts

```typescript
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:4000';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const socketClient = io(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});
```

## API Endpoints

### Authentication

**Register**
```
POST /api/auth/register
Body: {
  email: string,
  password: string,
  name: string,
  role: 'driver' | 'passenger'
}
Response: {
  user: { id, email, name, role },
  token: string
}
```

**Login**
```
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  user: { id, email, name, role },
  token: string
}
```

### Rides

**Request Ride**
```
POST /api/rides/request
Headers: Authorization: Bearer {token}
Body: {
  pickupLocation: string,
  destination: string,
  distance: number
}
Response: {
  id: string,
  passengerId: string,
  fare: number,
  status: 'pending'
}
```

**Get Available Rides** (Driver)
```
GET /api/rides/available
Headers: Authorization: Bearer {token}
Response: [
  {
    id: string,
    passengerId: string,
    pickupLocation: string,
    destination: string,
    fare: number
  }
]
```

**Accept Ride** (Driver)
```
POST /api/rides/{rideId}/accept
Headers: Authorization: Bearer {token}
Response: {
  id: string,
  driverId: string,
  status: 'accepted'
}
```

**Start Ride**
```
POST /api/rides/{rideId}/start
Headers: Authorization: Bearer {token}
Response: {
  id: string,
  status: 'in_progress',
  startedAt: timestamp
}
```

**Complete Ride**
```
POST /api/rides/{rideId}/complete
Headers: Authorization: Bearer {token}
Response: {
  id: string,
  status: 'completed',
  completedAt: timestamp
}
```

### Drivers

**Get Driver Info**
```
GET /api/drivers/{driverId}
Headers: Authorization: Bearer {token}
Response: {
  id: string,
  userId: string,
  rating: number,
  totalRides: number,
  totalEarnings: number,
  isOnline: boolean
}
```

**Go Online**
```
POST /api/drivers/online
Headers: Authorization: Bearer {token}
Response: {
  isOnline: true,
  lastSeen: timestamp
}
```

**Go Offline**
```
POST /api/drivers/offline
Headers: Authorization: Bearer {token}
Response: {
  isOnline: false,
  lastSeen: timestamp
}
```

**Update Location**
```
POST /api/drivers/location
Headers: Authorization: Bearer {token}
Body: {
  latitude: number,
  longitude: number
}
Response: {
  latitude: number,
  longitude: number,
  lastLocationUpdate: timestamp
}
```

## Socket.io Integration

### Driver App

```typescript
import { socketClient } from '@tuya/api';

// Go online
socketClient.emit('driver:online', {
  driverId: userId,
  latitude: 15.5527,
  longitude: 32.5599
});

// Listen for new rides
socketClient.on('ride:available', (ride) => {
  console.log('New ride available:', ride);
  // Show notification to driver
});

// Update location
socketClient.emit('location:update', {
  userId: driverId,
  latitude: 15.5527,
  longitude: 32.5599
});
```

### Passenger App

```typescript
import { socketClient } from '@tuya/api';

// Request ride
socketClient.emit('ride:request', {
  passengerId: userId,
  pickupLocation: 'Khartoum',
  destination: 'Omdurman'
});

// Listen for ride acceptance
socketClient.on('ride:accepted', (ride) => {
  console.log('Ride accepted:', ride);
  // Show driver info and location
});

// Listen for location updates
socketClient.on('location:changed', (location) => {
  console.log('Driver location:', location);
  // Update map
});
```

## Testing

### Test with cURL

```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "driver@tuya.com",
    "password": "password123",
    "name": "Ahmed",
    "role": "driver"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "driver@tuya.com",
    "password": "password123"
  }'

# Request Ride
curl -X POST http://localhost:4000/api/rides/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "pickupLocation": "Khartoum",
    "destination": "Omdurman",
    "distance": 15.5
  }'
```

## Deployment

After testing locally:

1. Deploy Backend to Railway
2. Update API_URL in Frontend apps
3. Deploy Frontend apps to Vercel
4. Update Socket.io CORS origin in Backend

## Troubleshooting

### CORS Error
- Check `SOCKET_IO_CORS_ORIGIN` in Backend .env
- Make sure Frontend URL is included

### Connection Refused
- Check Backend is running on port 4000
- Check firewall settings
- Verify DATABASE_URL is correct

### Token Expired
- Implement token refresh logic
- Store token in localStorage
- Add interceptor for 401 responses
