const express = require('express');
const { protect } = require('../../../backend/middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminOnly.middleware');

const reportRoutes = require('./report.routes');
const banRoutes = require('./ban.routes');
const appealRoutes = require('./appeal.routes');
const notificationRoutes = require('./notification.routes');
const adminRoutes = require('./admin.routes');
const sampleRoutes = require('./sample.routes');

const router = express.Router();

router.use('/report', protect, reportRoutes);
router.use('/ban', protect, banRoutes);
router.use('/appeal', protect, appealRoutes);
router.use('/notifications', protect, notificationRoutes);
router.use('/admin', protect, adminOnly, adminRoutes);
router.use('/sample', protect, sampleRoutes);

module.exports = router;
