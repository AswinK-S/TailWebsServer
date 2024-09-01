const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Teacher = require('../models/teacher')


// Configure the Local Strategy for Passport
passport.use(
    new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        try {
            const teacher = await Teacher.findOne({email})
            if(!teacher){
                return done(null,false,{message:'User not exists in this mail'})
            }

            const isMatch = await bcrypt.compare(password,teacher.password)
            if(!isMatch){
                return done(null,false,{message:'Invalid credentials'})
            }

            return done(null,teacher)
        } catch (error) {
            return done (err)
        }
    })
)

//serialize the user
passport.serializeUser((teacher,done)=>{
    done(null,teacher.id)
})

//Deserialize the user
passport.deserializeUser(async(id,done)=>{
    try {
        const teacher = await Teacher.findById(id)
        done(null,teacher)
    } catch (error) {
        done(err)
    }
})

module.exports = passport