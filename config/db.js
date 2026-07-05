const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/smart_management');
        console.log('✅ Connected to MongoDB successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Kill the server if the database fails
    }
};

module.exports = connectDB;