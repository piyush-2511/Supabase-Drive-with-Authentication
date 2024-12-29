const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  customPath : {
    type : String,
    required : [true, 'Custompath is required']
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : [true, 'User is required']
  },
  originalname : {
    type : String,
    required : [true, 'Originalname is required']
  }
})


const files = mongoose.model('file',fileSchema)

module.exports = files;