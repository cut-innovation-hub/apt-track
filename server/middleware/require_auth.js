require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * @notice - functions give permissions to users with certain roles
 * @param {token} req - token from the client 
 * @returns user object with id
 */
exports.requireUserSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(500).send({ error: err.message })
            }
            if (user.role === 'user' || user.role === 'admin') {
                req.user = user
                next()
            }
            else{
                return res.status(500).send({ message: 'Only Users perform that task' })
            }
        })

    } else {
        return res.status(500).send({ message: 'Authorisation Required!' })
    }
}

exports.requireOwnerSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(500).send({ error: err.message })
            }
            if (user.role === 'owner') {
                req.user = user
                next()
            }
            else{
                return res.status(500).send({ message: 'Only bus owners perform that task' })
            }
        })

    } else {
        return res.status(500).send({ message: 'Not Allowed to perform task' })
    }
}

exports.requireOwnerSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(500).send({ error: err.message })
            }
            if (user.role === 'admin') {
                req.user = user
                next()
            }
            else{
                return res.status(500).send({ message: 'Action is allowed by admins only' })
            }
        })

    } else {
        return res.status(500).send({ message: 'Not Allowed to perform task' })
    }
}