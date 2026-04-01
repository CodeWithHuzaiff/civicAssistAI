const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}. Please configure a valid MONGODB_URI in .env`);
        // We won't exit the process here so the server can continue running
        // process.exit(1);
    }
};

module.exports = connectDB;
