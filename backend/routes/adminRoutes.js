const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { checkBan } = require('../../frontend/Moderation/middleware/checkBan.middleware');
const { getAllData, updateUser, deleteUser, updateSettings, getUserDetails } = require('../controllers/adminController');

router.use(protect);
router.use(checkBan);
router.use(authorize('admin'));

router.get('/data', getAllData);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', getUserDetails);
router.put('/settings', updateSettings);

module.exports = router;
