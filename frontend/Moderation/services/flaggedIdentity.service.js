const FlaggedIdentity = require('../models/FlaggedIdentityModel');
const User = require('../../../backend/models/User');

/**
 * Upsert identity lock data for permanently banned users.
 * @param {{email?:string,phone?:string,username?:string,deviceFingerprint?:string,ip?:string,banId:string,adminId:string}} payload
 * @returns {Promise<void>}
 */
async function flagIdentity({ email, phone, username, deviceFingerprint, ip, banId, adminId }) {
  if (!banId || !adminId) return;

  const normalizedEmail = email?.toLowerCase().trim();
  const normalizedUsername = username?.toLowerCase().trim();
  const normalizedPhone = phone?.trim();

  const selector = {
    $or: [
      normalizedEmail ? { email: normalizedEmail } : null,
      normalizedPhone ? { phone: normalizedPhone } : null,
      normalizedUsername ? { username: normalizedUsername } : null,
    ].filter(Boolean),
  };

  const query = selector.$or.length ? selector : { relatedBanId: banId };

  await FlaggedIdentity.findOneAndUpdate(
    query,
    {
      $set: {
        email: normalizedEmail,
        phone: normalizedPhone,
        username: normalizedUsername,
        relatedBanId: banId,
        flaggedBy: adminId,
        flaggedAt: new Date(),
      },
      ...(deviceFingerprint ? { $addToSet: { deviceFingerprints: deviceFingerprint } } : {}),
      ...(ip ? { $addToSet: { ipAddresses: ip } } : {}),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

/**
 * Check if identity data is permanently flagged.
 * @param {{email?:string,phone?:string,username?:string,deviceFingerprint?:string}} payload
 * @returns {Promise<boolean>}
 */
async function checkFlagged({ email, phone, username, deviceFingerprint }) {
  const or = [];
  if (email) or.push({ email: email.toLowerCase().trim() });
  if (phone) or.push({ phone: phone.trim() });
  if (username) or.push({ username: username.toLowerCase().trim() });
  if (deviceFingerprint) or.push({ deviceFingerprints: deviceFingerprint });
  if (or.length === 0) return false;

  const match = await FlaggedIdentity.findOne({ $or: or }).lean();
  return Boolean(match);
}

/**
 * Resolve user identity details.
 * @param {string} userId
 * @returns {Promise<{email?:string,phone?:string,username?:string}>}
 */
async function getUserIdentity(userId) {
  const user = await User.findById(userId).select('email phone username').lean();
  return user || {};
}

module.exports = {
  flagIdentity,
  checkFlagged,
  getUserIdentity,
};
