const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
         type:String,
         require:true,
    },
    author:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('post',Schema);