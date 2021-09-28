const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    equipmentName: { type: String, required: true },
    category: { type: String, required: true },
    DOP: { type: Date, required: true },
    warranty: { type: Number, required: true },
    lastRD: { type: Date, required: true },
    nextRD: { type: Date, required: true },
}, {
    timestamps: true,
});

equipmentSchema.plugin(AutoIncrement, { id: 'equipment_seq', inc_field: 'equipmentID' });
const equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = equipment;