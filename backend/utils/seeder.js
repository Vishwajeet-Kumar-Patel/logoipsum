require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Creator = require('../models/Creator');
const Post = require('../models/Post');
const Subscriber = require('../models/Subscriber');
const AdminData = require('../models/AdminData');
const connectDB = require('../config/db');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Creator.deleteMany({});
        await Post.deleteMany({});
        await Subscriber.deleteMany({});

        // 0. Create Users
        console.log('Seeding Users...');
        const creatorUser = await User.create({
            name: 'Alex Morgan',
            email: 'creator@test.com',
            password: 'password123',
            role: 'creator'
        });

        await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin'
        });

        // 1. Create Default Creator
        console.log('Seeding Creator...');
        const creator = await Creator.create({
            userId: creatorUser._id.toString(),
            name: 'Alex Morgan',
            username: 'alexcreates',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
            bio: 'Digital Artist & Content Creator. 📸 Adventure Photography | 🎨 Digital Art | 🌴 Lifestyle vlogs',
            socialLinks: {
                instagram: 'https://instagram.com/alexcreates',
                facebook: 'https://facebook.com/alexmorgan.official',
                twitter: 'https://twitter.com/alex_creations',
                tiktok: 'https://tiktok.com/@alexcreates_daily'
            },
            earnings: {
                total: 24892.50,
                thisMonth: 4250.00
            }
        });

        // 2. Create Subscribers
        console.log('Seeding Subscribers...');
        const subscribersData = [
            { userId: 'sub_1', username: 'Jane Doe', joinDate: new Date('2026-01-10'), status: 'active', subscriptionTier: 'Premium' },
            { userId: 'sub_2', username: 'John Smith', joinDate: new Date('2026-02-15'), status: 'active', subscriptionTier: 'Standard' },
            { userId: 'sub_3', username: 'Emma Watson', joinDate: new Date('2026-03-01'), status: 'active', subscriptionTier: 'Premium' },
            { userId: 'sub_4', username: 'Bob Marley', joinDate: new Date('2026-03-05'), status: 'active', subscriptionTier: 'Standard' },
            { userId: 'sub_5', username: 'Mike Tyson', joinDate: new Date('2026-03-20'), status: 'active', subscriptionTier: 'Premium' },
            { userId: 'sub_6', username: 'Sarah Connor', joinDate: new Date('2026-03-25'), status: 'active', subscriptionTier: 'Standard' },
        ];
        
        for (const sub of subscribersData) {
            await Subscriber.create({ ...sub, creatorId: creator._id });
        }

        // 3. Create Posts
        console.log('Seeding Posts...');
        const postsData = [
            {
                title: 'Morning in the Himalayas',
                description: 'The golden hour in the mountains is something else.',
                mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
                mediaType: 'image',
                isExclusive: false,
                views: 4500,
                likes: 1200,
                comments: 85,
                revenue: { subscription: 450, exclusive: 0 }
            },
            {
                title: 'Secret Waterfall Location 🤫',
                description: 'Found this hidden gem during my last hike. Full vlog for premium subs!',
                mediaUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
                mediaType: 'image',
                isExclusive: true,
                views: 2800,
                likes: 950,
                comments: 120,
                revenue: { subscription: 800, exclusive: 320 }
            },
            {
                title: 'Setup Tour 2026',
                description: 'Building my new edit suite. Coming soon!',
                mediaUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
                mediaType: 'image',
                isExclusive: false,
                views: 12500,
                likes: 4500,
                comments: 420,
                revenue: { subscription: 1200, exclusive: 0 }
            },
            {
                title: 'Digital Painting Tutorial: Skies',
                description: 'Full 30-minute breakdown of how I paint realistic clouds and sunsets.',
                mediaUrl: 'https://res.cloudinary.com/dvi9jvkzq/video/upload/v1711548123/sample_video1.mp4',
                mediaType: 'video',
                isExclusive: true,
                views: 6500,
                likes: 2100,
                comments: 156,
                revenue: { subscription: 1500, exclusive: 850 }
            },
            {
                title: 'Exclusive BTS: Logo Design',
                description: 'A look into how I designed the new LogoIpsum branding.',
                mediaUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde3?w=800&q=80',
                mediaType: 'image',
                isExclusive: true,
                views: 3200,
                likes: 800,
                comments: 45,
                revenue: { subscription: 600, exclusive: 450 }
            }
        ];

        for (const post of postsData) {
            await Post.create({ ...post, creatorId: creator._id });
        }

        console.log('Database Seeding Complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seedData();
