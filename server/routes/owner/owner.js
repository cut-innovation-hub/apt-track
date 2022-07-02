const express = require('express')
const { requireUserSignIn, requireOwnerSignIn, requireAdminSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// create an owner account by applying for an account
router.post('/create',requireUserSignIn, async(req,res)=>{
    return res.status(200).send('create an owner account')
})

// edit an owner account
router.put('/edit/:id', requireOwnerSignIn, async(req,res)=>{
    return res.status(200).send({message:' edit a single bus owner account'})
})

//get a single bus account
router.get('/single/:id',requireAdminSignIn, (req, res)=>{
    return res.status(200).send({message: 'get a single owner account'})
})

// get all owner acconts for admin
router.get('/all',requireAdminSignIn, (req, res)=>{
    return res.status(200).send({message: 'get all owners and their info'})
})

// delete user account
router.delete('/delete/:id',requireOwnerSignIn, (req, res)=>{
    return res.status(200).send({message: 'delete user account'})
})

// renew subscription
router.put('/subscribe/:id', requireOwnerSignIn, (req,res)=>{
    res.send(200).message({message: 'renew subscription of the owner'})
})

module.exports = router