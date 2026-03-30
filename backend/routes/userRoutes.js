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
  getLiveStreams,
  reactToPost,
  getComments,
  addComment
} = require('../controllers/userController');

const {
  getMessages,
  sendMessage
} = require('../controllers/creatorController');

// Public routes
router.get('/creators', getCreators);
router.get('/creators/search', searchCreators);
router.get('/creators/:id', getCreatorProfile);
router.get('/creators/:id/posts', getCreatorPosts);
router.get('/livestreams', getLiveStreams);

// Protected routes (for Fans/Users)
router.use(protect);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);
router.get('/following', getFollowingCreators);
router.post('/follow/:creatorId', toggleFollowCreator);
router.get('/posts/:id', getPostDetails);

// Additional post interactions
router.post('/posts/:id/react', reactToPost);
router.get('/posts/:id/comments', getComments);
router.post('/posts/:id/comments', addComment);

module.exports = router;
