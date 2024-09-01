const {body,validationResult} = require('express-validator')

const validateStudent =[
    body('studentName')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:3})
    .withMessage('Name must be at least 3 characters long'),

    body('subjectName')
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({min:3})
    .withMessage('Subject name must be at least 3 characters long'),
   

    body('mark')
    .notEmpty()
    .withMessage('Mark is required')
    .isNumeric()
    .withMessage('Mark must be a number'),

    (req,res,next)=>{
        const errors = validationResult(req)
        console.log('err',errors);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next()
    }

]

module.exports = {
    validateStudent
}