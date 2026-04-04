const express = require('express');
const { submitAppeal } = require('../controllers/ban.controller');

const router = express.Router();

router.post('/:banId', submitAppeal);

module.exports = router;
