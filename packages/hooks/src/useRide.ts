import { useState, useCallback } from 'react';
import { create } from 'zustand';

export interface RideState {
  rides: any[];
  currentRide: any | null;
  addRide: (ride: any) => void;
  setCurrentRide: (ride: any) => void;
  updateRide: (id: string, updates: any) => void;
  removeRide: (id: string) => void;
}

export const useRideStore = create<RideState>((set) => ({
  rides: [],
  currentRide: null,
  addRide: (ride) =>
    set((state) => ({
      rides: [...state.rides, ride],
    })),
  setCurrentRide: (ride) =>
    set({
      currentRide: ride,
    }),
  updateRide: (id, updates) =>
    set((state) => ({
      rides: state.rides.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
  removeRide: (id) =>
    set((state) => ({
      rides: state.rides.filter((r) => r.id !== id),
    })),
}));

export function useRide() {
  const store = useRideStore();
  const [loading, setLoading] = useState(false);

  const requestRide = useCallback(
    async (pickup: string, destination: string) => {
      setLoading(true);
      try {
        // API call would go here
        const ride = {
          id: Date.now().toString(),
          pickupLocation: pickup,
          destination,
          status: 'pending',
          createdAt: new Date(),
        };
        store.addRide(ride);
        store.setCurrentRide(ride);
        return ride;
      } finally {
        setLoading(false);
      }
    },
    [store]
  );

  const cancelRide = useCallback(
    (rideId: string) => {
      store.removeRide(rideId);
    },
    [store]
  );

  return {
    ...store,
    requestRide,
    cancelRide,
    loading,
  };
}
