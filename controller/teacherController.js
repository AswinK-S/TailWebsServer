const bcrypt = require('bcryptjs')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const passport= require('passport')


//teacher's login
const login = async(req,res,next)=>{
    passport.authenticate('local',(err,teacher,info)=>{
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
            console.log('teacher',teacher)
            return res.status(200).json({message:'Login successfull',teacher})
        })
    })(req,res,next)
}

//logout
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
        const {studentName,subjectName,mark} =req.body
        const isStudentExists = await Student.findOne({name:studentName}, subjectName );
        
           

        if(isStudentExists){
           isStudentExists.mark = mark
           await isStudentExists.save();
           return res.status(200).json({message:"updated the matching student"})
        }

        const id= req.session.passport.user// taking the teacher id from the session
        const newStudent = new Student({name: studentName, subjectName, mark,teacherId:id});
        await newStudent.save();
      
        res.status(200).json({message:"New student created successfully",newStudent})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

//edit student
const editStudent = async(req,res)=>{
    try {
        const {studentName,subjectName,mark} = req.body
       const _id=req.params.id
        const student = await Student.findByIdAndUpdate(
           _id,
            {$set:{name:studentName,subjectName,mark}},
            {new:true,runValidators:true}
        )
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

// delete student 
const deleteStudent = async(req,res)=>{
    try {
        const _id = req.params.id
        const student= await  Student.findByIdAndDelete({_id})

       if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Server Error"})
    }
}


module.exports ={
    login,
    register,
    logout,
    addStudent,
    editStudent,
    getStudents,
    deleteStudent
}