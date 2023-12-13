const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User schema
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', // Reference to the Post schema
        required: true
    }
});
