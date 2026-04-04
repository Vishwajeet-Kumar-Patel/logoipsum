const mongoose = require('./_mongoose');
const { ADMIN_ACTIONS } = require('../utils/moderationConstants');

const AdminLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, enum: ADMIN_ACTIONS, required: true, index: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    targetType: { type: String, default: 'unknown' },
    reason: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: process.env.MODERATION_ADMIN_LOG_COLLECTION || 'moderation_admin_logs',
  }
);

const immutableError = () => new Error('AdminLog is append-only and cannot be modified.');
['updateOne', 'updateMany', 'findOneAndUpdate', 'deleteOne', 'deleteMany', 'findOneAndDelete'].forEach(
  (op) => {
    AdminLogSchema.pre(op, function preventMutations(next) {
      next(immutableError());
    });
  }
);

AdminLogSchema.pre('save', function preventOverwrite(next) {
  if (!this.isNew) {
    return next(immutableError());
  }
  return next();
});

module.exports = mongoose.models.AdminLog || mongoose.model('AdminLog', AdminLogSchema);
