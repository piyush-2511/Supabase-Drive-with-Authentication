const express = require('express')
const router = express.Router()
const {validationResult, body} = require('express-validator')
const userModel = require('../models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')


router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',
  body('username').trim().isLength({min : 3}),
  body('email').trim().isEmail().isLength({min : 13}),
  body('password').trim().isLength({min : 6}),
  async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
      return res.status(401).json({
        error : error.array(),
        message : 'Invalida Data'
      })
    }
    const {username, email, password} = req.body

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashPassword = await bcrypt.hash(password,10)

    const newUser = await userModel.create({
      username,
      email,
      password : hashPassword
    })

    res.redirect('/user/login')
  })





module.exports = router