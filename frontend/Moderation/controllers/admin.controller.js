const Report = require('../models/ReportModel');
const Ban = require('../models/BanModel');
const AdminLog = require('../models/AdminLogModel');
const Post = require('../../../backend/models/Post');
const Message = require('../../../backend/models/Message');
const { issueBan, liftBan } = require('../services/ban.service');
const { createNotification } = require('../services/notification.service');
const { log } = require('../services/adminLog.service');

const parsePagination = (query) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const redactReporter = (report) => ({
  _id: report._id,
  targetId: report.targetId,
  targetType: report.targetType,
  reason: report.reason,
  comment: report.comment,
  status: report.status,
  resolution: report.resolution,
  additionalReportersCount: report.additionalReporters?.length || 0,
  createdAt: report.createdAt,
  updatedAt: report.updatedAt,
  targetOwnerId: report.targetOwnerId,
});

/**
 * List paginated admin report queue.
 */
async function listReports(req, res) {
  try {
    const { status, type } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.targetType = type;

    const [items, total] = await Promise.all([
      Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Report.countDocuments(filter),
    ]);

    return res.status(200).json({
      items: items.map(redactReporter),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch reports queue.' });
  }
}

/**
 * Get full admin report detail.
 */
async function getReportDetail(req, res) {
  try {
    const report = await Report.findById(req.params.id).lean();
    if (!report) return res.status(404).json({ message: 'Report not found.' });

    let targetContent = null;
    if (report.targetType === 'post') {
      targetContent = await Post.findById(report.targetId).lean();
    }

    if (report.targetType === 'dm') {
      const message = await Message.findById(report.targetId).lean();
      if (message) {
        const fullThread = await Message.find({ conversationId: message.conversationId })
          .sort({ createdAt: 1 })
          .lean();
        targetContent = { message, thread: fullThread };
      }
    }

    return res.status(200).json({
      ...redactReporter(report),
      targetContent,
      reporterComment: report.comment || '',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch report detail.' });
  }
}

/**
 * Resolve/dismiss report and optionally issue ban.
 */
async function resolveReport(req, res) {
  try {
    const { action, banDuration, reason } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found.' });

    if (!['ban', 'dismiss'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action.' });
    }

    if (action === 'ban') {
      const duration = banDuration || '1w';
      const type = duration === 'permanent' ? 'permanent' : 'temporary';
      const targetUserId = report.targetOwnerId || (report.targetType === 'user' ? report.targetId : null);

      if (!targetUserId) {
        return res.status(400).json({ message: 'Cannot resolve target user for ban.' });
      }

      const ban = await issueBan(
        targetUserId,
        type,
        duration,
        reason || 'Violation of community guidelines',
        req.user._id,
        report._id,
        {
          deviceFingerprint: req.headers['x-device-fingerprint'],
          ip: req.ip,
        }
      );

      report.status = 'resolved';
      report.resolution = `Ban issued (${duration}).`;
      report.resolvedBy = req.user._id;
      await report.save();

      await createNotification(
        report.reportedBy,
        'report_update',
        'Report resolved',
        'Action has been taken on your report.',
        { reportId: report._id, banId: ban._id }
      );

      await log(req.user._id, 'report_resolved', report._id, 'report', reason || '', {
        action,
        banId: ban._id,
      });

      return res.status(200).json({ message: 'Report resolved and ban issued.', banId: ban._id });
    }

    report.status = 'dismissed';
    report.resolution = reason || 'Report dismissed by admin.';
    report.resolvedBy = req.user._id;
    await report.save();

    await createNotification(
      report.reportedBy,
      'report_update',
      'Report dismissed',
      'Your report was reviewed and dismissed.',
      { reportId: report._id }
    );

    await log(req.user._id, 'report_dismissed', report._id, 'report', reason || '', { action });

    return res.status(200).json({ message: 'Report dismissed.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update report.' });
  }
}

/**
 * Review an appeal decision.
 */
async function reviewAppeal(req, res) {
  try {
    const { decision, note } = req.body;
    const ban = await Ban.findById(req.params.banId);

    if (!ban) return res.status(404).json({ message: 'Ban not found.' });
    if (ban.appealStatus !== 'pending') {
      return res.status(400).json({ message: 'No pending appeal for this ban.' });
    }

    if (!['granted', 'denied'].includes(decision)) {
      return res.status(400).json({ message: 'Invalid decision.' });
    }

    ban.appealStatus = decision;
    ban.appealReviewedBy = req.user._id;
    ban.appealNote = (note || '').slice(0, 1000);

    if (decision === 'granted') {
      ban.isActive = false;
      await liftBan(ban._id, req.user._id);
      await createNotification(
        ban.userId,
        'appeal_granted',
        'Appeal granted',
        'Your appeal was accepted. Your restriction has been lifted.',
        { banId: ban._id }
      );
      await log(req.user._id, 'appeal_granted', ban.userId, 'user', note || '', { banId: ban._id });
    } else {
      await createNotification(
        ban.userId,
        'appeal_denied',
        'Appeal denied',
        'Your appeal was reviewed and denied.',
        { banId: ban._id }
      );
      await log(req.user._id, 'appeal_denied', ban.userId, 'user', note || '', { banId: ban._id });
    }

    await ban.save();
    return res.status(200).json({ message: 'Appeal reviewed.', appealStatus: ban.appealStatus });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to review appeal.' });
  }
}

/**
 * List immutable admin logs.
 */
async function listAdminLogs(req, res) {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const [items, total] = await Promise.all([
      AdminLog.find({}).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),
      AdminLog.countDocuments({}),
    ]);

    return res.status(200).json({
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch admin logs.' });
  }
}

/**
 * List active bans and pending appeals.
 */
async function listBans(req, res) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.appealStatus) filter.appealStatus = req.query.appealStatus;

    const [items, total] = await Promise.all([
      Ban.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Ban.countDocuments(filter),
    ]);

    return res.status(200).json({
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch bans.' });
  }
}

module.exports = {
  listReports,
  getReportDetail,
  resolveReport,
  reviewAppeal,
  listAdminLogs,
  listBans,
};
