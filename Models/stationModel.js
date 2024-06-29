const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    docks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dock'
    }]
}, { timestamps: true });

//stationSchema.index({ location: '2dsphere' });

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;