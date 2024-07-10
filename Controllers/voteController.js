const UserV = require('../Models/userVModel');
const crypto = require('crypto');
const Candidate = require('../Models/candidateModel');
const Ballot = require('../Models/ballot1Model');
const OTP = require('../Models/otpModel');
const {encrypt, decrypt} = require('../Middlewares/cryptoF');
const requireAdminAuth = require('../Middlewares/requireAuth');
const mongoose = require('mongoose');

//OTP
async function requestOTP(req, res) {
    try {
        // Find an unused OTP
        const otpEntry = await OTP.findOne({ used: false, userId: null });

        if (!otpEntry) {
            return res.status(404).json({ error: 'No available OTPs' });
        }

        res.json({ otp: otpEntry.otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to assign OTP' });
    }
}


//OTPASSIGN
async function validateAndUseOTP(voterId, otp) {
    try {
        // Find the OTP with the provided OTP and check if it is unused
        const otpEntry = await OTP.findOne({ otp, used: false, voterId: null });
        if (!otpEntry) {
            return false;  // OTP not found or already used
        }

        // Mark the OTP as used and assign it to the user
        otpEntry.used = true;
        otpEntry.voterId = voterId;
        await otpEntry.save();

        return true;  // OTP validated and marked as used
    } catch (error) {
        console.error(error);
        throw new Error('Failed to validate OTP');
    }
}

//FETCH CANDIDATES
const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find(); // Retrieve all candidates from database
        res.json(candidates); // Send the candidates as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


//BALLOT FORM
const generateBallotForm = async (req, res) => {
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
        if (user.hasVoted) {
            return res.status(403).json({ error: 'User has already voted' });
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
            voterName: user.name,  // Assuming username is the voter's name
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

//CAST VOTE
const submitVote = async(req, res) => {
    const voterId = req.user._id
    // const { userId } = req.user;
    const { candidateId, otp, ballotId } = req.body;

    try {
        // Validate OTP and mark it as used
        const isValidOTP = await validateAndUseOTP(voterId, otp);
        if (!isValidOTP) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }

        // Check if the user exists
        const user = await UserV.findById(voterId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if the user has already voted
        if (user.hasVoted) {
            return res.status(400).json({ error: 'User has already voted' });
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

        const voterName = user.name; // Ensure this value is defined
        const candidateName = candidate.name;

                // Logging to verify values
                console.log('Voter ID:', voterId);
                console.log('Candidate ID:', candidateId);
                console.log('OTP:', otp);
                console.log('Ballot ID:', ballotId);
                console.log('Voter Name:', voterName); 
                console.log('Candidate Name:', candidateName); 
        
                if (!voterName || !candidateName) {
                    throw new Error('Voter Name or Candidate Name is undefined');
                }

        const encryptedVoterName = encrypt(voterName); // Added encryption for voterName
        const encryptedCandidateName = encrypt(candidateName); // Added encryption for candidateName
        // Create a new ballot entryandidate.
        const newBallot = new Ballot({
            voterId,
            voterName: encryptedVoterName,
            candidateId,
            candidateName: encryptedCandidateName,
            otpUsed: otp,
            ballotId,
        });

        // Save the ballot
        await newBallot.save();

        // Update candidate votes
        candidate.votes++;

        // Save the updated candidate
        await candidate.save();

        // Mark the user as having voted
        user.hasVoted = true;
        await user.save();

        res.json({ message: 'Vote submitted successfully', ballot: newBallot });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// const decryptedBallots = async (req, res) => {
//     try {
//         const ballots = await Ballot.find(); // Retrieve all ballots
//         const decryptedBallots = ballots.map(ballot => ({
//             voterName: decrypt(ballot.voterName), // Decrypt voter name
//             candidateName: decrypt(ballot.candidateName), // Decrypt candidate name
//             ballotId: ballot.ballotId,
//             createdAt: ballot.createdAt,
//             updatedAt: ballot.updatedAt,
//             status: ballot.status,
//         }));
//         res.json(decryptedBallots);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch decrypted ballots' });
//     }
// }


module.exports = {
    generateBallotForm,
    submitVote,
    requestOTP,
    getCandidates,
    //decryptedBallots
};