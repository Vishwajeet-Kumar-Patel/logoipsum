const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCreators,
  getCreatorProfile,
  getCreatorPosts,
  getPostDetails,
  toggleFollowCreator,
  getFollowingCreators,
  searchCreators,
  getLiveStreams
} = require('../controllers/userController');

// Public routes
router.get('/creators', getCreators);
router.get('/creators/search', searchCreators);
router.get('/creators/:id', getCreatorProfile);
router.get('/creators/:id/posts', getCreatorPosts);
router.get('/livestreams', getLiveStreams);

// Protected routes (for Fans/Users)
router.use(protect);
router.get('/following', getFollowingCreators);
router.post('/follow/:creatorId', toggleFollowCreator);
router.get('/posts/:id', getPostDetails);

module.exports = router;
