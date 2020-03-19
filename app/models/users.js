const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersSchema = new Schema({
    username :{
        type: String,
        required:true,
        unique:true,
        minlength:4,
        maxlength:15      
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
   tokens:[
    {
        token:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
  ]
})

// pre hooks

usersSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(15)
        .then((salt)=>{
            bcryptjs.hash(user.password,salt)
            .then((encryptedPassword)=>{
                user.password = encryptedPassword
                next()
            })
        })
    }
    else{
        next()
    }
})

// own static methods

usersSchema.statics.findByCredentials=function(email, password){
    const User = this
    console.log('hello')
    return User.findOne({email})
    .then((user)=>{
        if(!user){
            
            return Promise.reject('Invalid email / password')
        }
        return bcryptjs.compare(password, user.password)
        .then((result)=>{
            if(result){
                console.log('bhanu')
               return  Promise.resolve(user)
            }
            else{
                console.log('vamsi')
                return Promise.reject('Invalid email / password')
            }
        })
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

usersSchema.statics.findByToken=function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'bhanu@3456')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}

// own instance methods

usersSchema.methods.generateToken=function(){
    const user = this
    const tokenData={
        _id : user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'bhanu@3456')
    user.tokens.push({token})
    console.log(token)
    return user.save()
    .then((user)=>{
        return Promise.resolve(token)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

const User = mongoose.model('User', usersSchema)

module.exports = User