const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, maxlength: 500 },
    votes: { type: Number, default: 0 }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;