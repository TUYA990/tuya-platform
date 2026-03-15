import { useState, useCallback } from 'react';
import { create } from 'zustand';

export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  setUser: (user) =>
    set({
      user,
    }),
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    set({
      token,
      isAuthenticated: true,
    });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export function useAuth() {
  const store = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        // API call would go here
        const response = {
          user: { id: '1', email, name: 'User' },
          token: 'mock-token',
        };
        store.setUser(response.user);
        store.setToken(response.token);
        return response;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [store]
  );

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setLoading(true);
      setError(null);
      try {
        // API call would go here
        const response = {
          user: { id: '1', email, name },
          token: 'mock-token',
        };
        store.setUser(response.user);
        store.setToken(response.token);
        return response;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [store]
  );

  return {
    ...store,
    login,
    signup,
    loading,
    error,
  };
}
