const mongoose = require('mongoose');

const ballotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    otpUsed: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    status: { type: String, default: 'pending' }, // Example status tracking
}, { timestamps: true });

const Ballot = mongoose.model('Ballot', ballotSchema);

module.exports = Ballot;