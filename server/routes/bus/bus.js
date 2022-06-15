const express = require('express')
const { requireUserSignIn, requireOwnerSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// create a bus
router.get('/create', requireOwnerSignIn, (req, res)=>{
    res.send({message: 'wo hoo'})
})

module.exports = router