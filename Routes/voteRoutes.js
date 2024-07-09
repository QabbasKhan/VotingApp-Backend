const express = require('express')
const {generateBallotForm, submitVote, requestOTP, getCandidates}=require('../Controllers/voteController')
const requireAuth = require('../Middlewares/requireAuth')
const router = express.Router()

router.use(requireAuth)
//router.use(requireAuth.initialize());

router.get('/', getCandidates);
router.post('/submitVote',submitVote)
router.get('/voteNow/:id',generateBallotForm)
router.post('/requestOtp', requestOTP);
// router.get('/candidates/voteNow/:CandidateId',stationAvailability)

module.exports = router