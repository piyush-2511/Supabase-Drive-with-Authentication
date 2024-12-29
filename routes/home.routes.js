const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/authentication.js');
const multer = require('multer');
const upload = multer();
const fileModel = require('../models/file.models.js');
const supabase = require('../config/supabase.js')


router.get('/',isAuthenticated, (req, res) => {
    res.render('index');    
});

router.post('/uploads',isAuthenticated,upload.single('file'),async (req,res)=>{
    // res.json(req.file)
    try{
      console.log(req.file.originalname)// this is from multer
      const customPath = `${Date.now()}${req.file.originalname}`
      
      const file = req.file;// this file comes from multer
        if (!file) {
          return res.status(400).send({ message: 'No file uploaded' });
        }
      
      // Upload the file to Supabase Storage
      const {data, error} = await supabase.storage
        .from('uploads')// this is the name of the bucket
        .upload(customPath, file.buffer,{// in this file buffer is the file data
          contentType : file.mimetype, // mimetype is the type of file
          upsert : false // set it true if you want ot overwrite the file with same name 
        })
  
      if (error){
        throw error
      }
      
      
      const customFileResponse = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadTime: new Date().toISOString(),
        customPath: customPath, // Example custom path
        // publicUrl : publicUrl
      };
      console.log(customFileResponse)
      
  
      const newFile = await fileModel.create({
        customPath : customPath,
        user : req.user.userId,
        originalname : req.file.originalname
      })
      // res.json(newFile)
      res.redirect('/')
    }catch(err){
      console.error(err.message)
      res.status(500).send('Server Error')
    }
    
  })



module.exports = router;