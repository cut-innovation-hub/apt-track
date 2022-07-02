const express = require('express')
const { requireBusOwnerSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// create a bus
router.get('/create', requireBusOwnerSignIn, (req, res)=>{
    res.send({message: 'wo hoo'})
})

module.exports = router