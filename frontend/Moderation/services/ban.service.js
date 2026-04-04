const Ban = require('../models/BanModel');
const { calcExpiry } = require('../utils/moderationHelpers');
const { createNotification } = require('./notification.service');
const { log } = require('./adminLog.service');
const { flagIdentity, getUserIdentity } = require('./flaggedIdentity.service');

/**
 * Issue a ban for a user.
 * @param {string} userId
 * @param {'temporary'|'permanent'} type
 * @param {'1w'|'2w'|'1m'|'permanent'} duration
 * @param {string} reason
 * @param {string} adminId
 * @param {string} reportId
 * @param {{deviceFingerprint?:string,ip?:string}} [identityContext]
 * @returns {Promise<any>}
 */
async function issueBan(userId, type, duration, reason, adminId, reportId, identityContext = {}) {
  const expiresAt = calcExpiry(duration);

  await Ban.updateMany({ userId, isActive: true }, { $set: { isActive: false } });

  const ban = await Ban.create({
    userId,
    type,
    duration,
    reason,
    issuedBy: adminId,
    relatedReportId: reportId,
    expiresAt,
    isActive: true,
  });

  if (type === 'permanent') {
    const identity = await getUserIdentity(userId);
    await flagIdentity({
      ...identity,
      deviceFingerprint: identityContext.deviceFingerprint,
      ip: identityContext.ip,
      banId: ban._id,
      adminId,
    });
    await log(adminId, 'identity_flagged', userId, 'user', reason, { banId: ban._id });
  }

  await createNotification(
    userId,
    'ban_issued',
    'Account restricted',
    type === 'permanent'
      ? 'Your account has been permanently banned.'
      : 'A temporary restriction has been applied to your account.',
    { banId: ban._id, duration, reason, type }
  );

  await log(adminId, 'ban_issued', userId, 'user', reason, {
    banId: ban._id,
    relatedReportId: reportId,
    type,
    duration,
  });

  return ban;
}

/**
 * Check current active ban and auto-expire elapsed temporary bans.
 * @param {string} userId
 * @returns {Promise<{isBanned:boolean,ban:any}|null>}
 */
async function checkActiveBan(userId) {
  const now = new Date();

  await Ban.updateMany(
    {
      userId,
      isActive: true,
      expiresAt: { $ne: null, $lte: now },
    },
    { $set: { isActive: false } }
  );

  const activeBan = await Ban.findOne({
    userId,
    isActive: true,
    $or: [{ expiresAt: { $gt: now } }, { expiresAt: null }],
  })
    .sort({ createdAt: -1 })
    .lean();

  if (!activeBan) return null;
  return { isBanned: true, ban: activeBan };
}

/**
 * Lift a ban manually.
 * @param {string} banId
 * @param {string} adminId
 * @returns {Promise<void>}
 */
async function liftBan(banId, adminId) {
  const ban = await Ban.findByIdAndUpdate(banId, { $set: { isActive: false } }, { new: true }).lean();
  if (!ban) return;

  await createNotification(
    ban.userId,
    'ban_lifted',
    'Restriction removed',
    'Your account restriction has been lifted.',
    { banId: ban._id }
  );

  await log(adminId, 'ban_lifted', ban.userId, 'user', 'Ban lifted by admin', { banId: ban._id });
}

module.exports = {
  issueBan,
  checkActiveBan,
  liftBan,
};
