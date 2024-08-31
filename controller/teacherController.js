const bcrypt = require('bcryptjs')
const Teacher = require('../models/teacher')
const passport= require('passport')


//teacher's login
const login = async(req,res,next)=>{
    passport.authenticate('local',(err,teacher,info)=>{
        console.log('login');
        if(err){
            return next(err)
        }
        if(!teacher){
            return res.status(401).json({message:info.message})
        }
        req.login(teacher,(err)=>{
            if(err){
                return next(err)
            }
            teacher.password=''
            return res.status(200).json({message:'Login successfull',teacher})
        })
    })(req,res,next)
}

const logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).json({message:'Logout failed'});
        }
        res.status(200).json({message:'Logout successful'})
    })
}

//teacher's signup 
const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const isExists = await Teacher.findOne({email})

        if(isExists){
            return res.status(400).json({message:'Teacher exists in this mail'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await Teacher.create({name,email,password:hashedPassword})
        res.status(200).json({message:'Registration successfull'})

    }catch(error){
        console.error(error.message)
    }
}

module.exports ={
    login,
    register,
    logout
}