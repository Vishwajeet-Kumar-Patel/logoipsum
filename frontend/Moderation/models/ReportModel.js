const mongoose = require('./_mongoose');
const { REPORT_REASONS, TARGET_TYPES, REPORT_STATUSES } = require('../utils/moderationConstants');

const ReportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    targetType: { type: String, enum: TARGET_TYPES, required: true, index: true },
    reason: { type: String, enum: REPORT_REASONS, required: true },
    comment: { type: String, maxlength: 500, default: '' },
    status: { type: String, enum: REPORT_STATUSES, default: 'pending', index: true },
    additionalReporters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolution: { type: String, default: '' },
    duplicateOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', default: null },
    targetOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  },
  {
    timestamps: true,
    collection: process.env.MODERATION_REPORT_COLLECTION || 'moderation_reports',
  }
);

ReportSchema.index({ targetId: 1, targetType: 1, status: 1 });

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
