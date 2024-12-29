const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/authentication.js');
const multer = require('multer');
const upload = multer();
const fileModel = require('../models/file.models.js');
const supabase = require('../config/supabase.js')


router.get('/',isAuthenticated,async (req,res)=>{
  
    const userFile = await fileModel.find({
      user : req.user.userId
    })
    console.log(userFile)
    res.render('index',{
      files : userFile
    })
  
  })

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
        .from(process.env.BUCKET_NAME)// this is the name of the bucket
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

router.get('/download/:customPath',isAuthenticated,async (req,res)=>{
    const loggedInUser = req.user.userId;
    const customPath = req.params.customPath;

    const file = await fileModel.findOne({
        user : loggedInUser,
        customPath : customPath
    });

    if(!file){
        return res.status(401).json({
        message : 'Unauthorized'
        })
    }

    // Generate a signed URL for the file
    const { data: signedUrlData, error } = await supabase.storage
    .from('uploads') // Replace with your bucket name
    .createSignedUrl(customPath, 60); // Generate a signed URL valid for 60 seconds

    if (error) {
        console.error('Error creating signed URL:', error.message);
        return res.status(500).json({ message: 'Failed to create signed URL' });
    }

    // Redirect the user to the signed URL
    res.redirect(signedUrlData.signedUrl); 
    })


router.get('/delete/:customPath',isAuthenticated,async (req,res)=>{
    const loggedInUser = req.user.userId;
    const customPath = req.params.customPath;
  
    const file = await fileModel.findOne({
      user : loggedInUser,
      customPath : customPath
    });
    if (!file){
      return res.status(401).json({
        message : 'File Not Found'
      })
    }
    // Delete the file from Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads') // Replace with your bucket name
      .remove([customPath]); // Pass the file name to delete
  
    if (error) {
      console.error('Error deleting file:', error.message);
      return res.status(500).json({ message: 'Failed to delete file' });
    }
  
    // Delete the file record from the database
    await fileModel.deleteOne({
      user : loggedInUser,
      customPath : customPath
    });
    res.redirect('/')
  })

module.exports = router;
