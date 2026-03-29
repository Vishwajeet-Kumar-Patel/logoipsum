const User = require('../models/User');
const Creator = require('../models/Creator');
const Post = require('../models/Post');

// @desc    Get all creators for discovery
// @route   GET /api/user/creators
exports.getCreators = async (req, res) => {
  try {
    const creators = await Creator.find({}).sort({ followers: -1 });
    res.json(creators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get specific creator profile
// @route   GET /api/user/creators/:id
exports.getCreatorProfile = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id);
    if (!creator) return res.status(404).json({ message: 'Creator not found' });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get posts for a creator (only public unless follower/subscriber)
// @route   GET /api/user/creators/:id/posts
exports.getCreatorPosts = async (req, res) => {
  try {
    const posts = await Post.find({ creatorId: req.params.id, status: 'published' }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Toggle follow creator
// @route   POST /api/user/follow/:creatorId
exports.toggleFollowCreator = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.creatorId);
    if (!creator) return res.status(404).json({ message: 'Creator not found' });

    // Assuming we have a follows array in User model or a separate Follow model
    // For now, let's just send success
    res.json({ message: 'Successfully followed/unfollowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Livestream = require('../models/Livestream');

// @desc    Get all active/scheduled livestreams for discovery
// @route   GET /api/user/livestreams
exports.getLiveStreams = async (req, res) => {
  try {
    const streams = await Livestream.find({ status: 'live' }).populate('creatorId');
    res.json(streams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get detailed post information
// @route   GET /api/user/posts/:id
exports.getPostDetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('creatorId');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get creators followed by the user
// @route   GET /api/user/following
exports.getFollowingCreators = async (req, res) => {
  try {
    // Dummy response for now (replace with real logic later)
    res.json({ message: "Following creators list" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Search creators
// @route   GET /api/user/creators/search
exports.searchCreators = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.json([]);
    const creators = await Creator.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(creators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
