const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongourl = process.env.MONGODB_URI;
        if (!mongourl) {
            throw new Error('MongoDB connection string not provided');
        }

        // Connect to MongoDB using the connection string
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;