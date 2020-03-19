const User = require('../models/users')
const _ = require('lodash')

module.exports.register=(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user)=>{
        res.json(user)
    }) 
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.login=(req,res)=>{
    const body = req.body
    User.findByCredentials(body.email, body.password)
    .then((user)=>{
        return user.generateToken()
    })
    .then((token)=>{
        res.setHeader('x-auth', token).json({})
    })
    .catch((err)=>{
        res.json(err)
    })
    
}

module.exports.account=(req,res)=>{
    const {user} = req
    res.json(_.pick(user,['_id','username','email']))

}

module.exports.logout=(req,res)=>{
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull:{tokens:{token}}})
    .then(()=>{
        res.json({notice:"succesfully logged out"})
    })
    .catch((err)=>{
        res.json(err)
    })
}