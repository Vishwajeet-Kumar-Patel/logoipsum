/**
 * Moderation constants and enum-like values.
 */
const envDuration = (key, fallback) => {
  const parsed = Number(process.env[key]);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const ADMIN_ROLE = process.env.ADMIN_ROLE || 'admin';

const BAN_DURATIONS = {
  '1w': envDuration('BAN_DURATION_1W_DAYS', 7),
  '2w': envDuration('BAN_DURATION_2W_DAYS', 14),
  '1m': envDuration('BAN_DURATION_1M_DAYS', 30),
  permanent: null,
};

const REPORT_REASONS = ['spam', 'harassment', 'fraud', 'explicit', 'impersonation', 'other'];
const TARGET_TYPES = ['post', 'user', 'dm'];
const BAN_TYPES = ['temporary', 'permanent'];
const REPORT_STATUSES = ['pending', 'under_review', 'resolved', 'dismissed'];
const APPEAL_STATUSES = ['none', 'pending', 'granted', 'denied'];
const NOTIFICATION_TYPES = ['ban_issued', 'ban_lifted', 'report_update', 'appeal_granted', 'appeal_denied'];
const ADMIN_ACTIONS = [
  'ban_issued',
  'ban_lifted',
  'report_resolved',
  'report_dismissed',
  'appeal_granted',
  'appeal_denied',
  'identity_flagged',
  'admin_route_access',
];

module.exports = {
  ADMIN_ROLE,
  BAN_DURATIONS,
  REPORT_REASONS,
  TARGET_TYPES,
  BAN_TYPES,
  REPORT_STATUSES,
  APPEAL_STATUSES,
  NOTIFICATION_TYPES,
  ADMIN_ACTIONS,
};
