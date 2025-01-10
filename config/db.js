const mongoose = require('mongoose');

function connecttoDB(){
    mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("DB Connected")
    })
}

module.exports = connecttoDB;