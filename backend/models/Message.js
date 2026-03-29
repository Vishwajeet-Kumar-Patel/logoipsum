const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ['image', 'video', 'file', 'link'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
