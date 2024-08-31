const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

const passport = require('./config/passport')
const session = require('express-session')

//routes
const teacherRoute = require('./router/teacherRoute')


const port =5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//sessoin middleware
app.use(session({
    secret: process.env.Session_Secret, // Replace with your secret
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin:' http://localhost:5173',
    credentials:true,
    methods:['GET','POST'],
    allowedHeaders:['Content-Type','Authorization']
}))

connectDB()
app.use('/api',teacherRoute)

app.listen(port,()=>{
    console.log(`server listening to http://localhost:${port}`);
})