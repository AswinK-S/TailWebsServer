const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subjectName:{
        type:String,
        required:true
    },
    mark:{
        type:Number,
        required:true
    }
})

const Student = mongoose.model('Student',studentSchema)
module.exports =Student