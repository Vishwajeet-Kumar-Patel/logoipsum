const express = require('express');
const { createReport, getMyReports, getReportById } = require('../controllers/report.controller');

const router = express.Router();

router.post('/', createReport);
router.get('/mine', getMyReports);
router.get('/:id', getReportById);

module.exports = router;
