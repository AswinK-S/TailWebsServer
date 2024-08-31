const express = require('express')
const router = express.Router()
const teacherController = require('../controller/teacherController')
const { validateRegistration } = require('../middleware/registrationValidation')
const ensureAuthenticated = require('../middleware/authMiddleware')
const { validateStudent } = require('../middleware/studentValidation')


router.post('/login',teacherController.login)
router.post('/register',validateRegistration,teacherController.register)
router.post('/logout',teacherController.logout)

router.post('/addStudent',ensureAuthenticated,validateStudent, teacherController.addStudent)

module.exports=router