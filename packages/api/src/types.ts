import { AxiosInstance } from 'axios';
import { Socket } from 'socket.io-client';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiClient {
  http: AxiosInstance;
  socket: Socket;
  setAuthToken: (token: string) => void;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'driver' | 'passenger' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Driver extends User {
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  rating: number;
  totalRides: number;
  earnings: number;
  isOnline: boolean;
}

export interface Passenger extends User {
  wallet: number;
  totalRides: number;
  rating: number;
}

export interface Ride {
  id: string;
  driverId: string;
  passengerId: string;
  pickupLocation: string;
  destination: string;
  distance: number;
  duration: number;
  fare: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}
