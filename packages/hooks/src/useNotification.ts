import { useState, useCallback } from 'react';
import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () =>
    set({
      notifications: [],
    }),
}));

export function useNotification() {
  const store = useNotificationStore();

  const showSuccess = useCallback(
    (message: string, duration = 3000) => {
      const id = Date.now().toString();
      store.addNotification({
        id,
        type: 'success',
        message,
        duration,
      });
      if (duration) {
        setTimeout(() => store.removeNotification(id), duration);
      }
    },
    [store]
  );

  const showError = useCallback(
    (message: string, duration = 3000) => {
      const id = Date.now().toString();
      store.addNotification({
        id,
        type: 'error',
        message,
        duration,
      });
      if (duration) {
        setTimeout(() => store.removeNotification(id), duration);
      }
    },
    [store]
  );

  const showInfo = useCallback(
    (message: string, duration = 3000) => {
      const id = Date.now().toString();
      store.addNotification({
        id,
        type: 'info',
        message,
        duration,
      });
      if (duration) {
        setTimeout(() => store.removeNotification(id), duration);
      }
    },
    [store]
  );

  return {
    ...store,
    showSuccess,
    showError,
    showInfo,
  };
}
