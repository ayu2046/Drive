const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,        
        trim: true,
        lowercase: true,
        minlength: [5, 'Username must be at least 5 characters long']
    },
    email : {
        type : String,
        required : true,
        unique : true,        
        trim: true,
        lowercase: true,
        minlength: [15, 'E-mail must be at least 15 characters long']
    },
    password : {
        type : String,
        required : true,       
        trim: true,
        lowercase: true,
        minlength: [8, 'Username must be at least 8 characters long']
    },
})

const user = mongoose.model('User', userschema);

module.exports = user;