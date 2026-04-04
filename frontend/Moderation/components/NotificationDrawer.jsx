'use client';

import { useEffect } from 'react';

export function NotificationDrawer({ open, onClose, notifications, markRead }) {
  useEffect(() => {
    if (!open) return;
    notifications.filter((n) => !n.isRead).forEach((n) => markRead(n._id));
  }, [open, notifications, markRead]);

  return (
    <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[1800] transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold">Moderation Notifications</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
        {notifications.map((n) => (
          <div key={n._id} className="border rounded-xl p-3">
            <p className="text-xs text-slate-500 uppercase">{n.type.replace('_', ' ')}</p>
            <p className="font-semibold text-sm mt-1">{n.title}</p>
            <p className="text-sm text-slate-600 mt-1">{n.body}</p>
            <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
