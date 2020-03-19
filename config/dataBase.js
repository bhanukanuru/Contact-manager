const mongoose = require('mongoose')

const setUpDb=()=>{
    mongoose.connect('mongodb://localhost:27017/contact')
    .then(()=>{
        console.log('Connnected to DB')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = setUpDb
