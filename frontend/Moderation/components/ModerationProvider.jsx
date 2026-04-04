'use client';

import { useState } from 'react';
import { useBanStatus } from '../hooks/useBanStatus';
import { useNotifications } from '../hooks/useNotifications';
import { BanPopup } from './BanPopup';
import { NotificationBell } from './NotificationBell';
import { NotificationDrawer } from './NotificationDrawer';

export function ModerationProvider() {
  const { isBanned, ban } = useBanStatus();
  const { notifications, unreadCount, markRead } = useNotifications();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[1500]">
        <NotificationBell unreadCount={unreadCount} onClick={() => setDrawerOpen(true)} />
      </div>
      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        notifications={notifications}
        markRead={markRead}
      />
      {isBanned ? <BanPopup ban={ban} /> : null}
    </>
  );
}
