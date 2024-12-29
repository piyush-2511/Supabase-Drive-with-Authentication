const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const {connectToDb} = require('./config/db.js');

dotenv.config(); // Load environment variables

const app = express();

// Connect to the database
//connectToDb();

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set view engine
app.set('view engine', 'ejs');

// Routes (You need to import and use your user routes here)
const userRoutes = require('./routes/user.routes.js');
app.use('/user', userRoutes); // Use the user routes under '/user'

// Start the server
(async () => {
  await connectToDb(); // Ensure connection is established
  app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000');
  });
})();
