const mongoose = require('./_mongoose');

const FlaggedIdentitySchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true, index: true },
    username: { type: String, trim: true, lowercase: true, index: true },
    deviceFingerprints: [{ type: String }],
    ipAddresses: [{ type: String }],
    relatedBanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ban', required: true },
    flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flaggedAt: { type: Date, default: Date.now },
  },
  {
    collection: process.env.MODERATION_FLAGGED_IDENTITY_COLLECTION || 'moderation_flagged_identities',
  }
);

module.exports =
  mongoose.models.FlaggedIdentity || mongoose.model('FlaggedIdentity', FlaggedIdentitySchema);
