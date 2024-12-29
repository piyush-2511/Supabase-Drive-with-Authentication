const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/authentication.js');

router.get('/',isAuthenticated, (req, res) => {
    res.render('index');    
});



module.exports = router;