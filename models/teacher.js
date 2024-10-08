const mongoose =require('mongoose')

const teacherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const Teacher = mongoose.model('Teacher',teacherSchema)
module.exports =Teacher