const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
require ('mongoose-double')(mongoose);
require('moment');

const SchemaTypes = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema({

    expenseType:{
        type:String,
        required:true
    },

    expenseDate:{
        type:Date,
        required:true
    },

    expenseDescription:{
        type:String,
        required:true
    },

    expenseAmount:{
        type:SchemaTypes.Double,
        required:true
    }



});


expenseSchema.plugin(AutoIncrement,{id:'expense_seq',inc_field:'ExpenseID'});

const expense = mongoose.model('Expenses',expenseSchema);

module.exports = mongoose.model('Expenses',expenseSchema);

