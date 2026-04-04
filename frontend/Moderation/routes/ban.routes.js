const express = require('express');
const { getBanStatus, getMyBans } = require('../controllers/ban.controller');

const router = express.Router();

router.get('/status', getBanStatus);
router.get('/history', getMyBans);

module.exports = router;
