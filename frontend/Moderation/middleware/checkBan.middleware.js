const { checkActiveBan } = require('../services/ban.service');

/**
 * Enforce active-ban checks on protected routes.
 */
async function checkBan(req, res, next) {
  try {
    if (!req.user?._id) {
      return next();
    }

    const active = await checkActiveBan(req.user._id);
    if (!active || !active.isBanned) return next();

    const { ban } = active;
    return res.status(403).json({
      isBanned: true,
      type: ban.type,
      duration: ban.duration,
      expiresAt: ban.expiresAt,
      reason: ban.reason,
      appealStatus: ban.appealStatus,
    });
  } catch (error) {
    console.error('[moderation][checkBan] soft-fail:', error?.message || error);
    return next();
  }
}

module.exports = {
  checkBan,
};
