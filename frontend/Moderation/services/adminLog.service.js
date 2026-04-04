const AdminLog = require('../models/AdminLogModel');

/**
 * Append an immutable admin audit log entry.
 * @param {string} adminId
 * @param {string} action
 * @param {string} targetId
 * @param {string} targetType
 * @param {string} reason
 * @param {Record<string, unknown>} metadata
 * @returns {Promise<void>}
 */
async function log(adminId, action, targetId, targetType, reason, metadata = {}) {
  await AdminLog.create({
    adminId,
    action,
    targetId,
    targetType,
    reason,
    metadata,
  });
}

module.exports = {
  log,
};
