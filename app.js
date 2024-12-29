const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const {connectToDb} = require('./config/db.js');
const userRoutes = require('./routes/user.routes.js');
const indexRoutes = require('./routes/home.routes.js')

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
app.use('/user', userRoutes); // Use the user routes under '/user'
app.use('/',indexRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Start the server
(async () => {
  await connectToDb(); // Ensure connection is established
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening at http://localhost:3000');
  });
})();
