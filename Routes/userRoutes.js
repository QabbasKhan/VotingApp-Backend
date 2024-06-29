const express = require ('express')

const router = express.Router()


const {loginUser,signupUser}=require('../Controllers/userController')



router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router