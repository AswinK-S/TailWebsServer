const mongoose = require('mongoose')

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI)
        console.log('mongoose connected');
    } catch (error) {
        console.error('mongoose error',error.message)
    }
}

module.exports =connectDB