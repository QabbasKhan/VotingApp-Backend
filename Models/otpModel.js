const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV'},
    otp: { type: String, required: true },
    used: { type: Boolean, default: false },  // Flag to mark if the OTP has been used
}, { timestamps: true });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;