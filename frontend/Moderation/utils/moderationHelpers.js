const { BAN_DURATIONS } = require('./moderationConstants');

/**
 * Calculate ban expiry date from a duration key.
 * @param {'1w'|'2w'|'1m'|'permanent'} duration
 * @returns {Date|null}
 */
function calcExpiry(duration) {
  const days = BAN_DURATIONS[duration];
  if (days === null || days === undefined) return null;
  const expiresAt = new Date();
  expiresAt.setUTCDate(expiresAt.getUTCDate() + days);
  return expiresAt;
}

/**
 * Format ban expiry date to human-readable string.
 * @param {Date|null} expiresAt
 * @returns {string}
 */
function formatBanExpiry(expiresAt) {
  if (!expiresAt) return 'Permanently banned';
  const date = new Date(expiresAt);
  return `Banned until ${date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

/**
 * Checks if a ban is currently active.
 * @param {{isActive:boolean,expiresAt:Date|null}} ban
 * @returns {boolean}
 */
function isBanActive(ban) {
  if (!ban || !ban.isActive) return false;
  if (!ban.expiresAt) return true;
  return new Date(ban.expiresAt) > new Date();
}

module.exports = {
  calcExpiry,
  formatBanExpiry,
  isBanActive,
};
