const mongoose = require('./_mongoose');
const { NOTIFICATION_TYPES } = require('../utils/moderationConstants');

const ModerationNotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: NOTIFICATION_TYPES, required: true },
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false, index: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    updatedAt: false,
    collection: process.env.MODERATION_NOTIFICATION_COLLECTION || 'moderation_notifications',
  }
);

module.exports =
  mongoose.models.ModerationNotification ||
  mongoose.model('ModerationNotification', ModerationNotificationSchema);
