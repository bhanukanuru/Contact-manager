const Contact = require('../models/Contacts')

module.exports.create=(req,res)=>{
    const body = req.body
    const contact = new Contact(body)
    //console.log(req.body)
    console.log(req.user)
    contact.user = req.user._id
    contact.save()
    .then((contact)=>{
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    const id = req.params.id
    Contact.findOne({
        _id :id,
        user: req.user._id
    })
    .then((contact)=>{
        if(contact){
            res.json(contact)
        }
        else{
            res.json({})
        }
    })
}

module.exports.list=(req,res)=>{
    Contact.find({user:req.user._id})
    .then((contacts)=>{
        res.json(contacts)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.update=(req,res)=>{
    const id = req.params.id
    const body = req.body
    Contact.findOneAndUpdate({_id:id, user: req.user._id},body,{new:true})
    .then((contact)=>{
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id = req.params.id
    Contact.findOneAndDelete({_id:id, user:req.user._id})
    .then((contact)=>{
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
}