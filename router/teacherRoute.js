const express = require('express')
const router = express.Router()
const teacherController = require('../controller/teacherController')
const { validateRegistration } = require('../middleware/registrationValidation')


router.post('/login',teacherController.login)
router.post('/register',validateRegistration,teacherController.register)
router.post('/logout',teacherController.logout)

module.exports=router