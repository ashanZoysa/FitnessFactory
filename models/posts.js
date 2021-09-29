const mongoose = require('mongoose');

var AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new mongoose.Schema({

    event:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true 
    },

    eventCategory:{
        type:String,
        required:true 
    },

    calories:{
        type:String,
        required:true 
    }

});

postSchema.plugin(AutoIncrement, { id: 'event_seq', inc_field: 'eventID' });
const event = mongoose.model('Event', postSchema);

module.exports = mongoose.model('Posts',postSchema);