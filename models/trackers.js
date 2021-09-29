const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({

    clientID:{
        type:String,
        required:true
    },

    eventID:{
        type:String,
        required:true
    },

    sessionsCompleted:{
        type:String,
        required:true 
    },

    caloriesBurnt:{
        type:String,
        required:true 
    }

});

module.exports = mongoose.model('Trackers',trackerSchema);