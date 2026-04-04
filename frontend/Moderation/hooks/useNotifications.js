'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/src/lib/api';

/**
 * Moderation notification hook with SSE support.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let source;

    const loadInitial = async () => {
      try {
        const { data } = await api.get('/moderation/notifications');
        setNotifications(Array.isArray(data) ? data : []);
      } catch {
        setNotifications([]);
      }
    };

    loadInitial();

    if (typeof window !== 'undefined') {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      if (!token) {
        return () => source?.close();
      }
      const streamUrl = `${base}/moderation/notifications/stream?token=${encodeURIComponent(token || '')}`;
      source = new EventSource(streamUrl);

      source.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (Array.isArray(payload)) {
            setNotifications((prev) => {
              const byId = new Map(prev.map((n) => [n._id, n]));
              payload.forEach((n) => byId.set(n._id, n));
              return [...byId.values()].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            });
          }
        } catch {
          // ignore malformed payloads
        }
      };
    }

    return () => source?.close();
  }, []);

  const markRead = async (id) => {
    try {
      await api.patch(`/moderation/notifications/${id}/read`);
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    } catch {
      // no-op
    }
  };

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  return { notifications, unreadCount, markRead };
}
