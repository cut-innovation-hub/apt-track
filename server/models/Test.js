const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    longitude:{
        type: Number
    },
    lotitude:{
        type: Number
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Test', testSchema)