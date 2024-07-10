const express = require ('express')
const {encrypt, decrypt} = require('../Middlewares/cryptoF');
//const requireAdminAuth = require('../Middlewares/adminAuth')
// const decryptedBallots =require('../Controllers/voteController')
const Ballot = require('../Models/ballot1Model');


const router = express.Router();
//router.use(requireAdminAuth);

router.get('/showBallots', async (req, res, next) => {
    const { name, password } = req.headers; // Assuming name and password are passed in headers
    
    // Replace with your actual admin authentication logic
    if (name === 'admin' && password === 'admin123') {
        try {
            const ballots = await Ballot.find(); // Retrieve all ballots
            const decryptedBallots = ballots.map(ballot => {
                try {
                    const decryptedVoterName = decrypt(ballot.voterName); // Decrypt voter name
                    const decryptedCandidateName = decrypt(ballot.candidateName); // Decrypt candidate name

                    // Log decrypted values for debugging
                    console.log('Decrypted Voter Name:', decryptedVoterName);
                    console.log('Decrypted Candidate Name:', decryptedCandidateName);

                    return {
                        voterName: decryptedVoterName,
                        candidateName: decryptedCandidateName,
                        ballotId: ballot.ballotId,
                        createdAt: ballot.createdAt,
                        updatedAt: ballot.updatedAt,
                        status: ballot.status,
                    };
                } catch (error) {
                    console.error('Decryption error for ballot:', ballot.ballotId, error);
                    return {
                        voterName: null,
                        candidateName: null,
                        ballotId: ballot.ballotId,
                        createdAt: ballot.createdAt,
                        updatedAt: ballot.updatedAt,
                        status: ballot.status,
                    };
                }
            });
            // const decryptedBallots = ballots.map(ballot =>({
            //     voterName: decrypt(ballot.voterName), // Decrypt voter name
            //     candidateName: decrypt(ballot.candidateName), // Decrypt candidate name
            //     ballotId: ballot.ballotId,
            //     createdAt: ballot.createdAt,
            //     updatedAt: ballot.updatedAt,
            //     status: ballot.status,
            // }));
            res.json(decryptedBallots);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch decrypted ballots' });
        }
        return next(); // Allow admin to proceed
    }
    return res.status(401).json({ error: 'Unauthorized' });

})


module.exports = router