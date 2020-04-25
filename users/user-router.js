const express = require('express')

const Users = require('./user-model')

const router = express.Router();

const bcrypt = require('bcryptjs') 

const jwt = require('jsonwebtoken')


//GET ALL USERS - PROTECTED

router.get('/', (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    Users.getAllUsersByDept(decoded.department)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json({ message: "error", err })
        })
})


module.exports = router
