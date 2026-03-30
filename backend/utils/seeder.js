require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Creator = require('../models/Creator');
const Post = require('../models/Post');
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
            category: 'Art and Design',
            status: 'active',
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

        // Add a second creator for variety
        console.log('Seeding Second Creator...');
        const creatorUser2 = await User.create({
          name: 'Sarah Jenkins',
          email: 'sarah@test.com',
          password: 'password123',
          role: 'creator'
        });

        const creator2 = await Creator.create({
          userId: creatorUser2._id.toString(),
          name: 'Sarah Jenkins',
          username: 'sarahcreates',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
          bio: 'Yoga Instructor & Wellness Coach. 🧘‍♀️ Mindfulness | 🥗 Healthy Eating | ✨ Spiritual Growth',
          category: 'Lifestyle',
          status: 'active',
          socialLinks: {
            instagram: 'https://instagram.com/sarahwellness'
          }
        });

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

        // Seed some posts for creator2
        await Post.create({
          title: 'Morning Yoga Routine',
          description: 'Start your day with these simple stretches.',
          mediaUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
          mediaType: 'image',
          creatorId: creator2._id,
          status: 'published'
        });

        console.log('Database Seeding Complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seedData();
