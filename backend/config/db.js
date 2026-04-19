const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use env variable if exists, otherwise fallback to local MongoDB
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/leetcode-clone";

        console.log('Connecting to MongoDB at:', mongoUri);

        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;