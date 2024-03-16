const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/libraryManagement'; 

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
