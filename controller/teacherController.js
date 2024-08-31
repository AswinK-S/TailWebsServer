const bcrypt = require('bcryptjs')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
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

//add student
const addStudent =async(req,res)=>{
    try {
        const {name,subjectName,mark} =req.body
        const isStudentExists = await Student.findOne({ name, subjectName });
        if(isStudentExists){
           isStudentExists.mark = mark
           await isStudentExists.save();
           return res.status(200).json({message:"updated the matching student"})
        }

        const newStudent = new Student({ name, subjectName, mark });
        await newStudent.save();
        res.status(200).json({message:"New student created successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

//edit student
const editStudent = async(req,res)=>{
    try {
        const {id,name,subjectName,mark} = req.body
        const student = await Student.findByIdAndUpdate(
            id,
            {$set:{name,subjectName,mark}},
            {new:true,runValidators:true}
        )
        console.log('st',student);
        if(!student){
           return res.status(404).json({message:"Student not found"})
        }

        res.status(200).json({ message: "Student updated successfully", student });

    } catch (error) {
       console.error(error.message)
       res.status(500).json({message:"Server error"})
    }
}

//get list of Students
const getStudents = async(req,res)=>{
    try {
        const students = await Student.find()
        res.status(200).json({students})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Server Error"})
    }
}


module.exports ={
    login,
    register,
    logout,
    addStudent,
    editStudent,
    getStudents
}