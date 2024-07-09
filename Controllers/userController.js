const express = require('express')
const jwt = require('jsonwebtoken')
const UserV = require('../Models/userVModel')

//CreatingToken
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '30d' });
}; 

//User Signing
const signupUser = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = await UserV.signup(name, email, password);
        console.log(user.name);
        const token = createToken(user._id);
        res.status(200).json({email,token});
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body

    try{
        const user = await UserV.login(email, password)
        console.log("Login successfuly")
        const token = createToken(user._id)
        console.log(token)
        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}