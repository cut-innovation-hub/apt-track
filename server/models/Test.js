const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    longitude:{
        type: String
    },
    latitude:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Test', testSchema)