const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    bus_number:{
        type: String,
        required: true
    },
    bus_description:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Bus', busSchema)