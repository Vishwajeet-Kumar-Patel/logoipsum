const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../utils/cloudinary');
const Post = require('../models/Post');
const Creator = require('../models/Creator');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Livestream = require('../models/Livestream');

// --- Dashboard ---
const getDashboardData = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) {
      // Create if they are a creator but profile is missing
      creator = await Creator.create({ 
          userId: req.user._id.toString(), 
          name: req.user.name, 
          username: req.user.name.toLowerCase().replace(' ', '') 
      });
    }

    const posts = await Post.find({ creatorId: creator._id });
    const activeSubscribers = creator.subscribers ? creator.subscribers.length : 0;
    const totalEarned = creator.earnings.total;
    const thisMonth = creator.earnings.thisMonth;

    // Per-post revenue table (mocked or aggregated)
    const postRevenueBreakdown = posts.map(p => ({
      id: p._id,
      title: p.title,
      type: p.mediaType,
      date: p.createdAt,
      revenueSubscription: p.revenue.subscription || 0,
      revenueExclusive: p.revenue.exclusive || 0,
      total: (p.revenue.subscription || 0) + (p.revenue.exclusive || 0)
    })).sort((a,b) => b.date - a.date).slice(0, 5);

    // Month breakdown (stub data)
    const revenueHistory = [
      { name: 'Last Month', subscription: 3500, exclusive: 1200 },
      { name: 'This Month', subscription: 3000, exclusive: 1800 },
    ];

    res.json({
      creator,
      stats: {
        totalEarned,
        thisMonth,
        activeSubscribers,
        postCount: posts.length
      },
      postRevenueBreakdown,
      revenueHistory
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCreatorProfile = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    const { name, username, bio, avatar } = req.body;

    if (name) creator.name = name;
    if (username) creator.username = username.toLowerCase().replace(' ', '');
    if (bio !== undefined) creator.bio = bio;
    if (avatar) creator.avatar = avatar;

    await creator.save();
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Engagement Analytics ---
const getAnalytics = async (req, res) => {
  try {
    const { timeRange } = req.query; // e.g. '7d', '30d', 'all'
    const creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) return res.status(404).json({ error: 'Creator profile not found' });

    // In a real app, you'd filter posts by createdAt based on timeRange
    const posts = await Post.find({ creatorId: creator._id }).sort({ createdAt: 1 });

    const engagementChart = posts.map(p => ({
      name: p.title.length > 10 ? p.title.substring(0, 7) + '...' : p.title,
      views: p.views || 0,
      likes: p.likes || 0,
      comments: p.comments || 0,
      date: p.createdAt
    }));

    res.json({ engagementChart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Posts ---
const upload = multer({ storage: multer.memoryStorage() }).single('file');

const createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    try {
      let creator = await Creator.findOne({ userId: req.user._id.toString() });
      if (!creator) creator = await Creator.create({ 
          userId: req.user._id.toString(), 
          name: req.user.name, 
          username: req.user.name.toLowerCase().replace(' ', '') 
      });

      let mediaUrl = '';
      if (req.file) {
        const streamUpload = (req) => {
          return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              { resource_type: 'auto', folder: 'logoipsum_creator' },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        };
        const result = await streamUpload(req);
        mediaUrl = result.secure_url;
      } else if (req.body.mediaUrl) {
        mediaUrl = req.body.mediaUrl;
      }

      const { title, description, mediaType, isExclusive, status, category, price } = req.body;

      const newPost = await Post.create({
        title: title || 'Untitled Post',
        description: description || '',
        mediaType: mediaType || 'image',
        mediaUrl: mediaUrl || 'https://via.placeholder.com/600',
        isExclusive: isExclusive === 'true' || isExclusive === true,
        status: status || 'published',
        category: category || 'content',
        price: parseFloat(price || 0),
        creatorId: creator._id,
        views: 0,
        likes: 0,
        comments: 0
      });

      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        let post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        
        // Ensure owner
        const creator = await Creator.findOne({ userId: req.user._id.toString() });
        if (!creator || post.creatorId.toString() !== creator._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this post' });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPosts = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) return res.json([]);

    const posts = await Post.find({ creatorId: creator._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Social Links ---
const updateSocialLinks = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) creator = await Creator.create({ 
        userId: req.user._id.toString(), 
        name: req.user.name, 
        username: req.user.name.toLowerCase().replace(' ', '') 
    });

    const { platform, url, links } = req.body;
    
    // Bulk update
    if (links) {
        Object.keys(links).forEach(p => {
            if (creator.socialLinks.hasOwnProperty(p)) {
                creator.socialLinks[p] = links[p];
            }
        });
    } 
    // Single platform update
    else if (platform && url !== undefined) {
        if (creator.socialLinks.hasOwnProperty(platform)) {
            creator.socialLinks[platform] = url;
        }
    }

    await creator.save();
    res.json(creator.socialLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSocialLinks = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    res.json(creator ? creator.socialLinks : {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Subscribers ---
const getSubscribers = async (req, res) => {
    try {
        let creator = await Creator.findOne({ userId: req.user._id.toString() }).populate('subscribers', 'name email createdAt');
        if (!creator) return res.json([]);

        // Subscribers are now directly part of the Creator object
        res.json(creator.subscribers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInsightsData = async (req, res) => {
  try {
    let creator = await Creator.findOne({ userId: req.user._id.toString() });
    if (!creator) creator = await Creator.create({ 
        userId: req.user._id.toString(), 
        name: req.user.name, 
        username: req.user.name.toLowerCase().replace(' ', '') 
    });

    // Mock Audience Stats
    const audienceStats = {
      totalUsers: 200,
      activeUsers: 4000,
      profileVisitsRenown: 1500,
      profileVisitsDirect: 1500
    };

    // Mock Sales Stats
    const salesStats = {
      totalSales: 200,
      conversionRate: '20%'
    };

    // Mock Memberships Stats
    const membershipStats = {
      totalMemberships: 200,
      totalMembershipMembers: 200,
      cancelledMembers: 4000,
      conversionRate: '15%'
    };

    // Revenue chart data
    const revenueChart = [
      { date: '20 March, 2026', title: 'Membership name', free: 30, membership: 10, revenue: 600 },
      { date: '21 March, 2026', title: 'Membership name', free: 35, membership: 12, revenue: 800 },
      { date: '22 March, 2026', title: 'Membership name', free: 40, membership: 15, revenue: 1000 },
    ];

    res.json({
      audienceStats,
      salesStats,
      membershipStats,
      revenueChart
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Notifications ---
const getNotifications = async (req, res) => {
    try {
        let notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
        
        // Seed if no actual notifications exist for demo
        if (notifications.length === 0) {
            await Notification.create([
                { recipient: req.user._id, type: 'post', content: 'You successfully published a new video post.', createdAt: new Date() },
                { recipient: req.user._id, type: 'subscription', content: 'Jane Doe joined your Premium tier.', createdAt: new Date(Date.now() - 3600000) },
                { recipient: req.user._id, type: 'like', content: 'Your latest photo post got 50 new likes.', createdAt: new Date(Date.now() - 86400000) },
                { recipient: req.user._id, type: 'payout', content: 'Your payout of $1500 has been processed.', createdAt: new Date(Date.now() - 172800000) }
            ]);
            notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
        }
        
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.json({ message: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Payouts ---
const getPayoutSettings = async (req, res) => {
    try {
        let creator = await Creator.findOne({ userId: req.user._id.toString() });
        if (!creator) return res.status(404).json({ error: 'Creator profile not found' });
        res.json(creator.payoutSettings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatePayoutSettings = async (req, res) => {
    try {
        let creator = await Creator.findOne({ userId: req.user._id.toString() });
        if (!creator) return res.status(404).json({ error: 'Creator not found' });

        const { type, data } = req.body; // type: 'kyc', 'billing', 'bank'
        if (creator.payoutSettings[type]) {
            Object.assign(creator.payoutSettings[type], data);
            creator.payoutSettings[type].updatedAt = new Date();
            // If they provided details, set status to pending or verified for demo
            if (type === 'kyc') creator.payoutSettings[type].status = 'pending';
            else creator.payoutSettings[type].status = 'verified';
        }

        await creator.save();
        res.json(creator.payoutSettings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Livestreams ---
const createLivestream = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        try {
            let creator = await Creator.findOne({ userId: req.user._id.toString() });
            if (!creator) return res.status(404).json({ error: 'Creator profile missing' });

            const { title, description, audience, scheduledTime, settings } = req.body;
            let thumbnail = '';

            if (req.file) {
                const streamUpload = (req) => {
                    return new Promise((resolve, reject) => {
                        let stream = cloudinary.uploader.upload_stream(
                            { resource_type: 'auto', folder: 'logoipsum_livestreams' },
                            (error, result) => {
                                if (result) resolve(result);
                                else reject(error);
                            }
                        );
                        streamifier.createReadStream(req.file.buffer).pipe(stream);
                    });
                };
                const result = await streamUpload(req);
                thumbnail = result.secure_url;
            }

            const newLive = await Livestream.create({
                title,
                description,
                thumbnail: thumbnail || 'https://via.placeholder.com/600x400',
                audience,
                scheduledTime,
                creatorId: creator._id,
                settings: settings ? JSON.parse(settings) : { displayChat: true, notificationsEnabled: true, autoModeration: true }
            });

            res.status(201).json(newLive);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

const getLivestreams = async (req, res) => {
    try {
        let creator = await Creator.findOne({ userId: req.user._id.toString() });
        if (!creator) return res.json([]);
        const livestreams = await Livestream.find({ creatorId: creator._id }).sort({ scheduledTime: 1 });
        res.json(livestreams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const Message = require('../models/Message');

const getMessages = async (req, res) => {
    try {
        const creator = await Creator.findOne({ userId: req.user._id.toString() });
        if (!creator) return res.json([]);

        // Get all unique conversations for this user
        const messages = await Message.find({ 
            $or: [{ sender: req.user._id }, { recipient: req.user._id }] 
        }).sort({ createdAt: -1 }).populate('sender recipient', 'name email');
        
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { recipientId, text, mediaUrl, mediaType } = req.body;
        const message = await Message.create({
            conversationId: [req.user._id, recipientId].sort().join('_'),
            sender: req.user._id,
            recipient: recipientId,
            text,
            mediaUrl,
            mediaType
        });
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
  getDashboardData,
  createPost,
  getPosts,
  updatePost,
  deletePost,
  updateSocialLinks,
  getSocialLinks,
  getAnalytics,
  getSubscribers,
  getInsightsData,
  updateCreatorProfile,
  getNotifications,
  markNotificationRead,
  getPayoutSettings,
  updatePayoutSettings,
  createLivestream,
  getLivestreams,
  getMessages,
  sendMessage
};
