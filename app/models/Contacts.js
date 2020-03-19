const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
      
    contactname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
