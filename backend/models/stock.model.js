const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    stockName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    unitCost: { type: Number, required: true },
}, {
    timestamps: true,
});

stockSchema.plugin(AutoIncrement, { id: 'stock_seq', inc_field: 'stockID' });
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;