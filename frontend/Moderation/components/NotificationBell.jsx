'use client';

export function NotificationBell({ unreadCount, onClick }) {
  return (
    <button className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border" onClick={onClick}>
      <span aria-hidden>🔔</span>
      {unreadCount > 0 ? (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full text-[11px] px-1 bg-red-600 text-white">
          {unreadCount}
        </span>
      ) : null}
    </button>
  );
}
