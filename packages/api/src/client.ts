import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { io, Socket } from 'socket.io-client';

export interface ApiClient {
  http: AxiosInstance;
  socket: Socket;
  setAuthToken: (token: string) => void;
}

export function createApiClient(baseURL: string): ApiClient {
  const http = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor for auth token
  http.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor for error handling
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // Initialize Socket.io
  const socket = io(baseURL, {
    auth: {
      token: localStorage.getItem('authToken'),
    },
  });

  return {
    http,
    socket,
    setAuthToken: (token: string) => {
      localStorage.setItem('authToken', token);
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
      socket.auth = { token };
      socket.connect();
    },
  };
}
