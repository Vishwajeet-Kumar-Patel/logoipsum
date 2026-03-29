const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['post', 'like', 'comment', 'subscription', 'payout', 'system'], 
    required: true 
  },
  content: { type: String, required: true },
  relatedId: { type: mongoose.Schema.Types.ObjectId }, // Post ID, Subscriber ID, etc.
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
