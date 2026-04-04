const mongoose = require('./_mongoose');
const { BAN_TYPES, APPEAL_STATUSES } = require('../utils/moderationConstants');

const BanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: BAN_TYPES, required: true },
    duration: { type: String, enum: ['1w', '2w', '1m', 'permanent'], required: true },
    reason: { type: String, required: true },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    relatedReportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
    expiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true, index: true },
    appealStatus: { type: String, enum: APPEAL_STATUSES, default: 'none', index: true },
    appealNote: { type: String, default: '' },
    appealReviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notified: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: process.env.MODERATION_BAN_COLLECTION || 'moderation_bans',
  }
);

BanSchema.index({ userId: 1, isActive: 1, expiresAt: 1 });

module.exports = mongoose.models.Ban || mongoose.model('Ban', BanSchema);
