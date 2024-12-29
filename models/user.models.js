const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true, // Ensure email is unique
    minlength: [13, 'Email must be at least 13 characters long'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

// Export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
