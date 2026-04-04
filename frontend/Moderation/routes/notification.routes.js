const express = require('express');
const {
  getNotifications,
  markNotificationRead,
  streamNotifications,
} = require('../controllers/notification.controller');

const router = express.Router();

router.get('/', getNotifications);
router.patch('/:id/read', markNotificationRead);
router.get('/stream', streamNotifications);

module.exports = router;
