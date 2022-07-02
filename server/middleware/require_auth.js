require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * @notice - functions give permissions to users with certain roles
 * @param {token} req - token from the client 
 * @returns user object with id
 */
exports.requireUserSignIn = (req, res, next) => {
    if (req.headers.authorization) {

        //get token from headers
        const token = req.headers.authorization

        // verufy if token is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

            // if error occured while validating token return that error
            if (err) {
                res.status(500).send({ error: err.message })
            }
            // if token is valid return user object
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

// middleware for authentocating bus driver
exports.requireOwnerSignIn = (req, res, next) => {
    if (req.headers.authorization) {
         //get token from headers
        const token = req.headers.authorization

        // verufy if token is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

            // if error occured while validating token return that error
            if (err) {
                return res.status(500).send({ error: err.message })
            }
             // if token is valid return user object
            if (user.role === 'driver' || user.role === 'admin') {
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

// middleware for authentcating admisn only
exports.requireAdminSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        //get token from headers
        const token = req.headers.authorization

        // verufy if token is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // if error occured while validating token return that error
            if (err) {
                return res.status(500).send({ error: err.message })
            }

            // if token is valid return user object
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

// middleware for authenticating bus owners onlyr 
exports.requireBusOwnerSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        //get token from headers
        const token = req.headers.authorization

        // verufy if token is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // if error occured while validating token return that error
            if (err) {
                return res.status(500).send({ error: err.message })
            }

            // if token is valid return user object
            if (user.role === 'admin' || user.role === 'bus_admin') {
                req.user = user
                next()
            }
            else{
                return res.status(500).send({ message: 'Action is allowed by bus owners' })
            }
        })

    } else {
        return res.status(500).send({ message: 'Not Allowed to perform task' })
    }
}