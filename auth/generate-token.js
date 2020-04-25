const jwt = require('jsonwebtoken')

module.exports = (user) => {
    console.log("generating token")
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options)
    return token
}