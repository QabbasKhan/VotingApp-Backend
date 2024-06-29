const express = require('express')
const router = express.Router()
const {stationAvailability,rentBike,returnBike}=require('../Controllers/rentController')
const requireAuth = require('../Middlewares/requireAuth')

router.use(requireAuth)
//router.use(requireAuth.initialize());

router.post('/rent',rentBike)
router.post('/return',returnBike)
router.get('/station/:stationId',stationAvailability)

module.exports = router