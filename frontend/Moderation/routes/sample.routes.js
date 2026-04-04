const express = require('express');
const { listReports, getReportDetail, listBans } = require('../controllers/admin.controller');

const router = express.Router();

/**
 * Sample moderation visibility routes (auth required, no admin role gate)
 * to support demo/admin UI parity in non-admin test accounts.
 */
router.get('/reports', listReports);
router.get('/reports/:id', getReportDetail);
router.get('/bans', listBans);

module.exports = router;
