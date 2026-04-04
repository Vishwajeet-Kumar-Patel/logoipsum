const ModerationNotification = require('../models/NotificationModel');
const { markRead } = require('../services/notification.service');

/**
 * Get all moderation notifications for current user.
 */
async function getNotifications(req, res) {
  try {
    const notifications = await ModerationNotification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch notifications.' });
  }
}

/**
 * Mark one moderation notification as read.
 */
async function markNotificationRead(req, res) {
  try {
    await markRead(req.params.id, req.user._id);
    return res.status(200).json({ message: 'Notification marked as read.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to mark notification.' });
  }
}

/**
 * SSE stream for unread moderation notifications.
 */
async function streamNotifications(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  let closed = false;

  const tick = async () => {
    if (closed) return;

    try {
      const unread = await ModerationNotification.find({
        userId: req.user._id,
        isRead: false,
      })
        .sort({ createdAt: -1 })
        .lean();

      res.write(`data: ${JSON.stringify(unread)}\n\n`);
    } catch (error) {
      res.write(`event: error\ndata: ${JSON.stringify({ message: 'stream_error' })}\n\n`);
    }
  };

  const interval = setInterval(tick, 5000);
  tick();

  req.on('close', () => {
    closed = true;
    clearInterval(interval);
    res.end();
  });
}

module.exports = {
  getNotifications,
  markNotificationRead,
  streamNotifications,
};
