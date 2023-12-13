const mongoose = require('mongoose');
require('dotenv').config();

const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}

module.exports = DBconnection;
