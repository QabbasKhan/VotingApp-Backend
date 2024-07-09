const mongoose = require('mongoose');

const ballotSchema = new mongoose.Schema({
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voterName: { type: String, required: true }, // Updated field name
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    candidateName: { type: String, required: true },
    otpUsed: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    status: { type: String, default: 'pending' }, // Example status tracking
}, { timestamps: true });

const Ballot = mongoose.model('Ballot', ballotSchema);

module.exports = Ballot;