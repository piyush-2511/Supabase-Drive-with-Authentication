const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const userModel = require('../models/user.models.js');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
  res.render('register'); // Render registration page
});

router.post(
  '/register',
  // Validation rules
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .isLength({ min: 13 })
      .withMessage('Email must be at least 13 characters long'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: 'Invalid data provided',
        });
      }

      const { username, email, password } = req.body;

      // // Check if the user already exists
      // const existingUser = await userModel.findOne({ email });
      // if (existingUser) {
      //   return res.status(400).json({ message: 'Email is already registered' });
      // }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await userModel.create({
        username,
        email,
        password: hashPassword,
      });

      console.log(`New user created: ${newUser.username}`);

      // Redirect to login page after successful registration
      // res.redirect('/user/login');
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

module.exports = router;
