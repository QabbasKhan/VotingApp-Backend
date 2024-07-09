const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp: { type: String, required: true },
    used: { type: Boolean, default: false },
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV', default: null } // Track which user is assigned the OTP
}, { timestamps: true });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;