const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();
const connectToDb = require('./config/db.js')
connectToDb();



app.use(cookieParser()) //this should be at top 
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))



app.listen(3000,()=>{
  console.log('Server is listening at localhost:3000')
})


