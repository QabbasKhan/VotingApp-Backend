const express = require('express')
const {generateBallotForm, submitVote}=require('../Controllers/voteController')
const requireAuth = require('../Middlewares/requireAuth')
const router = express.Router()

router.use(requireAuth)
//router.use(requireAuth.initialize());

router.post('/submitVote',submitVote)
router.get('/:id',generateBallotForm)
// router.get('/candidates/voteNow/:CandidateId',stationAvailability)

module.exports = router