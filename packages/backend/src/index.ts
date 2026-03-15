const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server: SocketIOServer } = require('socket.io');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: (process.env.SOCKET_IO_CORS_ORIGIN || 'http://localhost:3000').split(','),
    methods: ['GET', 'POST'],
  },
});

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit auth attempts
  skipSuccessfulRequests: true,
});

app.use(limiter);

// CORS Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Auth routes with stricter rate limiting
app.post('/api/auth/register', authLimiter, (req, res) => {
  res.json({ message: 'Register endpoint' });
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  res.json({ message: 'Login endpoint' });
});

// Socket.io events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Driver events
  socket.on('driver:online', (data) => {
    console.log(`Driver ${data.driverId} is online`);
    socket.broadcast.emit('driver:status', { driverId: data.driverId, status: 'online' });
  });

  socket.on('driver:offline', (data) => {
    console.log(`Driver ${data.driverId} is offline`);
    socket.broadcast.emit('driver:status', { driverId: data.driverId, status: 'offline' });
  });

  // Ride events
  socket.on('ride:request', (data) => {
    console.log(`Ride requested: ${data.rideId}`);
    io.emit('ride:available', data);
  });

  socket.on('ride:accept', (data) => {
    console.log(`Ride accepted: ${data.rideId}`);
    io.to(data.passengerId).emit('ride:accepted', data);
  });

  socket.on('ride:start', (data) => {
    console.log(`Ride started: ${data.rideId}`);
    io.to(data.passengerId).emit('ride:started', data);
  });

  socket.on('ride:complete', (data) => {
    console.log(`Ride completed: ${data.rideId}`);
    io.to(data.passengerId).emit('ride:completed', data);
  });

  // Location tracking events
  socket.on('driver:location:update', (data) => {
    console.log(`Driver location updated: ${data.driverId}`);
    io.to(data.rideId).emit('driver:location:changed', {
      driverId: data.driverId,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('ride:location:update', (data) => {
    console.log(`Ride location updated: ${data.rideId}`);
    io.to(data.rideId).emit('ride:location:changed', {
      rideId: data.rideId,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date().toISOString()
    });
  });

  // Rating events
  socket.on('ride:rate', (data) => {
    console.log(`Ride rated: ${data.rideId}`);
    io.emit('ride:rated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.io: ws://localhost:${PORT}`);
});
