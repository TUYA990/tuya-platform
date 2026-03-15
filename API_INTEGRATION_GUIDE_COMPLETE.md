# API Integration Guide for Frontend Apps

## 📋 Overview

This guide explains how to connect the Driver App, Passenger App, and Admin Dashboard to the Backend API.

---

## 🔧 Step 1: Update Environment Variables

### Driver App (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
NEXT_PUBLIC_APP_NAME=TUYA Driver
```

### Passenger App (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
NEXT_PUBLIC_APP_NAME=TUYA Passenger
```

### Admin Dashboard (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
NEXT_PUBLIC_APP_NAME=TUYA Admin
```

---

## 📡 Step 2: API Endpoints

### Health Check
```
GET /api/health
Response: { status: "OK", timestamp: "...", uptime: 123.45 }
```

### Authentication

#### Register
```
POST /api/auth/register
Body: {
  email: "user@example.com",
  password: "password123",
  name: "User Name",
  role: "driver" | "passenger"
}
Response: { token: "jwt_token", user: {...} }
```

#### Login
```
POST /api/auth/login
Body: {
  email: "user@example.com",
  password: "password123"
}
Response: { token: "jwt_token", user: {...} }
```

### Rides

#### Request Ride
```
POST /api/rides/request
Headers: { Authorization: "Bearer token" }
Body: {
  pickupLocation: "Khartoum",
  destination: "Omdurman",
  rideType: "economy" | "premium" | "xl",
  pickupLatitude: 15.5,
  pickupLongitude: 32.5
}
Response: { rideId: "...", fare: 25.50, estimatedTime: 15 }
```

#### Accept Ride
```
POST /api/rides/:rideId/accept
Headers: { Authorization: "Bearer token" }
Response: { rideId: "...", status: "accepted" }
```

#### Complete Ride
```
POST /api/rides/:rideId/complete
Headers: { Authorization: "Bearer token" }
Body: { actualFare: 25.50, distance: 12.5 }
Response: { rideId: "...", status: "completed" }
```

#### Get Ride Details
```
GET /api/rides/:rideId
Headers: { Authorization: "Bearer token" }
Response: { rideId: "...", driver: {...}, passenger: {...}, status: "..." }
```

### Drivers

#### Go Online
```
POST /api/drivers/online
Headers: { Authorization: "Bearer token" }
Body: { latitude: 15.5, longitude: 32.5 }
Response: { status: "online" }
```

#### Go Offline
```
POST /api/drivers/offline
Headers: { Authorization: "Bearer token" }
Response: { status: "offline" }
```

#### Update Location
```
POST /api/drivers/location
Headers: { Authorization: "Bearer token" }
Body: { latitude: 15.5, longitude: 32.5 }
Response: { updated: true }
```

### Pricing

#### Get Fare Estimate
```
GET /api/pricing/estimate?distance=12.5&rideType=economy&lat=15.5&lon=32.5
Response: {
  minFare: 20.00,
  maxFare: 30.00,
  estimatedFare: 25.50,
  surgeMultiplier: 1.2
}
```

---

## 🔌 Step 3: Socket.io Integration

### Connect to Socket
```javascript
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  auth: {
    token: localStorage.getItem('token')
  }
});

socket.on('connect', () => {
  console.log('Connected to server');
});
```

### Driver Events

#### Go Online
```javascript
socket.emit('driver:online', {
  driverId: 'driver-id',
  latitude: 15.5,
  longitude: 32.5
});
```

#### Update Location
```javascript
socket.emit('driver:location:update', {
  driverId: 'driver-id',
  rideId: 'ride-id',
  latitude: 15.5,
  longitude: 32.5
});

// Listen for passenger updates
socket.on('ride:location:changed', (data) => {
  console.log('Ride location:', data);
});
```

#### Accept Ride
```javascript
socket.emit('ride:accept', {
  rideId: 'ride-id',
  driverId: 'driver-id',
  passengerId: 'passenger-id'
});
```

### Passenger Events

#### Request Ride
```javascript
socket.emit('ride:request', {
  rideId: 'ride-id',
  passengerId: 'passenger-id',
  pickupLocation: 'Khartoum',
  destination: 'Omdurman'
});

// Listen for driver acceptance
socket.on('ride:accepted', (data) => {
  console.log('Driver accepted:', data);
});
```

#### Track Driver Location
```javascript
socket.on('driver:location:changed', (data) => {
  console.log('Driver location:', {
    latitude: data.latitude,
    longitude: data.longitude,
    timestamp: data.timestamp
  });
  // Update map with driver location
});
```

#### Complete Ride
```javascript
socket.emit('ride:complete', {
  rideId: 'ride-id',
  driverId: 'driver-id'
});

socket.on('ride:completed', (data) => {
  console.log('Ride completed');
  // Show rating dialog
});
```

### Rating Events

```javascript
socket.emit('ride:rate', {
  rideId: 'ride-id',
  rating: 5,
  comment: 'Great driver!'
});

socket.on('ride:rated', (data) => {
  console.log('Ride rated');
});
```

---

## 🔐 Step 4: Authentication

### Store Token
```javascript
// After login
localStorage.setItem('token', response.token);
localStorage.setItem('user', JSON.stringify(response.user));
```

### Use Token in Requests
```javascript
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
};

fetch('/api/rides/request', {
  method: 'POST',
  headers,
  body: JSON.stringify({...})
});
```

### Refresh Token (if needed)
```javascript
// Add to API client
if (response.status === 401) {
  // Token expired, redirect to login
  localStorage.removeItem('token');
  window.location.href = '/login';
}
```

---

## 📍 Step 5: Location Tracking

### Get User Location
```javascript
navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    
    // Update location every 5 seconds
    socket.emit('driver:location:update', {
      driverId: userId,
      rideId: rideId,
      latitude,
      longitude
    });
  },
  (error) => console.error(error),
  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
);
```

---

## 🧪 Step 6: Testing

### Test Health Endpoint
```bash
curl http://localhost:4000/api/health
```

### Test Socket Connection
```javascript
const socket = io('http://localhost:4000');
socket.on('connect', () => console.log('Connected!'));
socket.on('disconnect', () => console.log('Disconnected!'));
```

### Test API with Postman
1. Import API endpoints
2. Set Authorization header with token
3. Test each endpoint
4. Verify responses

---

## ✅ Verification Checklist

- [ ] Environment variables updated
- [ ] API URL is correct
- [ ] Socket URL is correct
- [ ] Can connect to API
- [ ] Can connect to Socket.io
- [ ] Authentication works
- [ ] Can request ride
- [ ] Can accept ride
- [ ] Location updates work
- [ ] Ratings work

---

## 🚀 Deployment URLs

### Production
```
API: https://tuya-backend.railway.app
Socket: wss://tuya-backend.railway.app
```

### Update Environment Variables for Production
```env
NEXT_PUBLIC_API_URL=https://tuya-backend.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://tuya-backend.railway.app
```

---

**Status: Ready for Testing** ✅
