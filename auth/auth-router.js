const express = require('express')

const Users = require('./auth-model')

const router = express.Router();

const bcrypt = require('bcryptjs') 

const generateToken = require('./generate-token')

//REGISTER

router.post('/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14)

    credentials.password = hash;

    Users.addUser(credentials)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json({ message: "There was an error adding the user." })
        })
})


//LOGIN
router.post('/login', (req, res) => {
    const { username } = req.body;
    Users.findUsername(username)
        .then(async (user) => {
            if(user[0] && bcrypt.compareSync(req.body.password, user[0].password)) {
                const token = await generateToken(user[0])
                res.status(200).json({ message: `Welcome ${user[0].username}!`, token: token })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            res.status(500).json({message: "error", error})
        })
})


module.exports = router;
