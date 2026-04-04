const ModerationNotification = require('../models/NotificationModel');

/**
 * Create a moderation notification.
 * @param {string} userId
 * @param {string} type
 * @param {string} title
 * @param {string} body
 * @param {Record<string, unknown>} metadata
 * @returns {Promise<void>}
 */
async function createNotification(userId, type, title, body, metadata = {}) {
  await ModerationNotification.create({ userId, type, title, body, metadata });
}

/**
 * Mark a single moderation notification as read.
 * @param {string} notificationId
 * @param {string} userId
 * @returns {Promise<void>}
 */
async function markRead(notificationId, userId) {
  await ModerationNotification.findOneAndUpdate(
    { _id: notificationId, userId },
    { $set: { isRead: true } },
    { new: true }
  );
}

/**
 * Get unread moderation notifications.
 * @param {string} userId
 * @returns {Promise<Array>}
 */
async function getUnread(userId) {
  return ModerationNotification.find({ userId, isRead: false }).sort({ createdAt: -1 }).lean();
}

module.exports = {
  createNotification,
  markRead,
  getUnread,
};
