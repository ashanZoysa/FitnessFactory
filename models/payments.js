const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
require ('mongoose-double')(mongoose);
require('moment');

const SchemaTypes = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema({

        userName:{
            type:String,
            required:true
        },

        paymentDate:{
            type:Date,
            require:true,

        },

        category:{
            type:String,
            require:true
        },


        description:{
            type:String,
            required:true

        },

        amount:{
            type: SchemaTypes.Double,
            required:true
        }
    }   


);

paymentSchema.plugin(AutoIncrement,{id:'payment_seq',inc_field:'PaymentID'});

const payment = mongoose.model('Payments',paymentSchema);

module.exports = mongoose.model('Payments',paymentSchema);

