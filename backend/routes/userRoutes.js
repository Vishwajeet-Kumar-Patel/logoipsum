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
  updateUserProfile,
  getUserNotifications,
  markUserNotificationRead,
  markAllUserNotificationsRead,
  reactToPost,
  getComments,
  addComment,
  updateComment,
  deleteComment,
  getCreatorReviews,
  addCreatorReview,
  getReviewReplies,
  addReviewReply
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
router.get('/creators/:id/reviews', getCreatorReviews);
router.get('/livestreams', getLiveStreams);
router.get('/posts/:id', getPostDetails);
router.get('/posts/:id/comments', getComments);
router.get('/reviews/:id/replies', getReviewReplies);

// Protected routes (for Fans/Users)
router.use(protect);
router.put('/update-profile', updateUserProfile);
router.get('/notifications', getUserNotifications);
router.put('/notifications/mark-all-read', markAllUserNotificationsRead);
router.put('/notifications/:id/read', markUserNotificationRead);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);
router.get('/following', getFollowingCreators);
router.post('/follow/:creatorId', toggleFollowCreator);

// Additional post interactions
router.post('/posts/:id/react', reactToPost);
router.post('/posts/:id/comments', addComment);
router.put('/comments/:commentId', updateComment);
router.delete('/comments/:commentId', deleteComment);

router.post('/creators/:id/reviews', addCreatorReview);

// Review replies
router.post('/reviews/:id/replies', addReviewReply);

module.exports = router;
