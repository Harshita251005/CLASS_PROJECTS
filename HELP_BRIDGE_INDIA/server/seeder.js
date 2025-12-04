const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const HelpRequest = require('./models/HelpRequest');
const Volunteer = require('./models/Volunteer');
const NGO = require('./models/NGO');
const Event = require('./models/Event');
const Blog = require('./models/Blog');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await HelpRequest.deleteMany();
    await Volunteer.deleteMany();
    await NGO.deleteMany();
    await Event.deleteMany();
    await Blog.deleteMany();

    // Mock Data

    const events = [
      {
        title: "Mega Blood Donation Camp",
        date: new Date("2023-11-15"),
        time: "10:00 AM - 4:00 PM",
        venue: "Community Hall, Sector 18, Noida",
        description: "Join us for a life-saving blood donation drive. Every drop counts!",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Winter Clothes Collection",
        date: new Date("2023-11-20"),
        time: "9:00 AM - 6:00 PM",
        venue: "City Center Mall, MG Road, Gurgaon",
        description: "Donate your old warm clothes to help the homeless survive the winter.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Tree Plantation Drive",
        date: new Date("2023-11-25"),
        time: "8:00 AM - 11:00 AM",
        venue: "Lodi Gardens, New Delhi",
        description: "Let's make our city greener. Saplings and tools will be provided.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ];

    const blogs = [
      {
        title: "Understanding Mental Health: Breaking the Stigma",
        category: "Mental Health",
        excerpt: "Mental health is just as important as physical health. Learn how to identify signs of stress and anxiety.",
        content: "Full content here...",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1527137342181-191f532c0e88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Child Labor: A Blot on Humanity",
        category: "Child Labor",
        excerpt: "Millions of children are forced into labor. Here is what we can do to stop it and ensure their education.",
        content: "Full content here...",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1603787081207-362bcef7c144?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Women Safety: Rights and Laws in India",
        category: "Women Safety",
        excerpt: "Every woman should know her legal rights. A comprehensive guide to laws protecting women in India.",
        content: "Full content here...",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ];

    await Volunteer.insertMany(volunteers);
    await NGO.insertMany(ngos);
    await Event.insertMany(events);
    await Blog.insertMany(blogs);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
