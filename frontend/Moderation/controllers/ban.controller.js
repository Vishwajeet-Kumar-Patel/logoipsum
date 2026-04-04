const Ban = require('../models/BanModel');
const { checkActiveBan } = require('../services/ban.service');
const { createNotification } = require('../services/notification.service');

/**
 * Get active ban status of current user.
 */
async function getBanStatus(req, res) {
  try {
    const active = await checkActiveBan(req.user._id);
    if (!active) return res.status(200).json(null);

    const { ban } = active;
    return res.status(200).json({
      isBanned: true,
      type: ban.type,
      duration: ban.duration,
      expiresAt: ban.expiresAt,
      reason: ban.reason,
      appealStatus: ban.appealStatus,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch ban status.' });
  }
}

/**
 * Submit an appeal for a specific ban.
 */
async function submitAppeal(req, res) {
  try {
    const { note } = req.body;
    const ban = await Ban.findById(req.params.banId);

    if (!ban || ban.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Ban not found.' });
    }

    if (ban.appealStatus !== 'none') {
      return res.status(400).json({ message: 'Appeal already submitted or decided.' });
    }

    ban.appealStatus = 'pending';
    ban.appealNote = (note || '').slice(0, 1000);
    await ban.save();

    await createNotification(
      req.user._id,
      'report_update',
      'Appeal submitted',
      'Your appeal has been submitted and is awaiting review.',
      { banId: ban._id }
    );

    return res.status(200).json({ message: 'Appeal submitted.', appealStatus: ban.appealStatus });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to submit appeal.' });
  }
}

/**
 * List ban history for current user.
 */
async function getMyBans(req, res) {
  try {
    const bans = await Ban.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
    return res.status(200).json(bans);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch ban history.' });
  }
}

module.exports = {
  getBanStatus,
  submitAppeal,
  getMyBans,
};
