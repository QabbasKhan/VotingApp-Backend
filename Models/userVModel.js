const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
// const Wallet = require('../Models/walletModel')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    // role: { type: String, enum: ['admin', 'voter'], default: 'voter' }, // Example role management
    // address: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.statics.signup = async function(name, email, password) {

    // validation
    if (!name || !email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

 
  
    const user = await this.create({ name, email, password: hash })

    return user
  }
// static login method, 
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

  module.exports = mongoose.model('UserV', userSchema)