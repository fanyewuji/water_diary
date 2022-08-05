const mongoose = require('mongoose');

const WaterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: String,
        default: new Date().toISOString().substring(0, 10),
        required: true
    },
    water: {
        type: Number,
        required: true,
        default: 0
    },
    goal: {
        type: Number,
        required: true,
        default: 2000
    },
    cupSize: {
        type: Number,
        required: true,
        default: 250
    },
});

WaterSchema.index({ user: 1, date: -1 }, { unique: true });

module.exports = mongoose.model('water', WaterSchema);
