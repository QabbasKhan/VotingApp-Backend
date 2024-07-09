const UserV = require('../Models/userVModel');
const Candidate = require('../Models/candidateModel');
const Ballot = require('../Models/ballot1Model');
const mongoose = require('mongoose')

// // Dummy OTP validation function (replace with your actual OTP validation logic)
// function isValidOTP(otp) {
//     // Add your OTP validation logic here
//     return true;
// }

async function generateBallotForm(req, res) {
    const userId = req.user._id;
    const { id } = req.params;
    // const { userId } = req.user;
    // const { candidateId } = req.params;

    try {

        console.log(`User ID: ${userId}`);  // Debugging line
        console.log(`Candidate ID: ${id}`);  // Debugging line

        // Find the user
        const user = await UserV.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the candidate
        const candidate = await Candidate.findById(id);

        console.log(`Candidate: ${candidate}`);  // Debugging line
        
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Generate a unique ballot ID (example)
        const ballotId = Math.random().toString(36).substr(2, 9);

        // Prepare data for the ballot form
        const ballotForm = {
            voterName: user.username,  // Assuming username is the voter's name
            voterId: user._id,         // Assuming _id is the voter's ID
            candidateName: candidate.name,
            candidateId: candidate._id,
            ballotId,
        };

        res.json(ballotForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function submitVote(req, res) {
    const userId = req.user._id
    // const { userId } = req.user;
    const { candidateId, otp, ballotId } = req.body;

    try {
        // Validate OTP (replace with your OTP validation logic)
        // if (!isValidOTP(otp)) {
        //     return res.status(401).json({ error: 'Invalid OTP' });
        // }

        // Check if the user exists
        const user = await UserV.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the candidate
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Check if the ballot ID is unique (this is a simple uniqueness check)
        const existingBallot = await Ballot.findOne({ ballotId });
        if (existingBallot) {
            return res.status(400).json({ error: 'Ballot ID already used' });
        }

        // Create a new ballot entry
        const newBallot = new Ballot({
            userId,
            candidateId,
            otpUsed: otp,
            ballotId,
        });

        // Save the ballot
        await newBallot.save();

        // Update candidate votes
        candidate.votes++;

        // Save the updated candidate
        await candidate.save();

        res.json({ message: 'Vote submitted successfully', ballot: newBallot });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    generateBallotForm,
    submitVote,
};