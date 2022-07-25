const express = require('express')
const { requireBusOwnerSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// create a bus
router.get('/create', requireBusOwnerSignIn, (req, res)=>{

    /* 
        information needed for seach bus
    */
    const {bus_id, number_plate, status, driver, destination, departure } = req.body
    if(!number_plate || !driver || !destination){
        return res.status(400).send({message: 'Please enter number plate'})
    }
    if(!driver){
        return res.status(400).send({message: 'Please enter driver name'})
    }
    if(!destination){
        return res.status(400).send({message: 'Please enter destination address'})
    }

    

    res.send({message: 'wo hoo'})
})

module.exports = router