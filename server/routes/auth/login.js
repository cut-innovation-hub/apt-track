const express = require('express')
const User = require('../../models/User')
const router = express.Router()
const bcrypt = require( 'bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @TODO make emailVerified value in schema true once emails have been bought
 * @swagger
 * /auth/login:
 *    post:
 *      description: login user and created a token
 *    parameters:
 *      - email: email
 *        in: body
 *        description: email of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - password: password
 *        in: body
 *        description: password of user that will be encrypted in db
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Login successfully
 *      '500':
 *        description: Failed to login user
 */
router.post('/',async (req, res)=>{
    // fields from request
    const { email, password } = req.body

    const _user = await User.findOne({ email: email })

    // user not found
    if(!_user){
        return res.status(404).send({message: 'Account does not exist!'})
    }else{
        if(!_user.emailApproved){
            return res.status(403).send({message: "Verify your email in database"})
        }

        // decrypt password value from database
        const password_correct = await bcrypt.compare(password, _user.password)
        if (password_correct) {
            const token = await jwt.sign({
                name: _user.name,
                email: _user.email,
                _id: _user._id,
                role: _user.role,
                emailVerified: _user.emailApproved,
                //@ts-ignore
            }, process.env.JWT_SECRET)
            if (token) {
                const user = {
                    name: _user.name,
                    email: _user.email,
                    _id: _user._id,
                    role: _user.role,
                    emailVerified: _user.emailApproved,
                }
                
                return res.send({...user, message: 'logged in sucessfully'})
            } else {
                return res.status(422).send({ message: 'Failed to login, Wrong details!' })
            }
        } else {
            return res.status(400).send({ message: 'Wrong login details' })
        }

    }


})

module.exports = router