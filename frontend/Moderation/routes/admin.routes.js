const express = require('express');
const {
  listReports,
  getReportDetail,
  resolveReport,
  reviewAppeal,
  listAdminLogs,
  listBans,
} = require('../controllers/admin.controller');

const router = express.Router();

router.get('/reports', listReports);
router.get('/reports/:id', getReportDetail);
router.patch('/reports/:id/resolve', resolveReport);
router.patch('/appeal/:banId', reviewAppeal);
router.get('/logs', listAdminLogs);
router.get('/bans', listBans);

module.exports = router;
