const jwt = require("jsonwebtoken")

const secretKey = "SecretKey"

exports.generateAuthToken = function(user) {
    const payload = {
        sub: user.id,
        role: user.role

    }
    return jwt.sign(payload, secretKey, { expiresIn: "24h" })
}

exports.requireAuthentication = function(req, res, next) {
    const authHeader = req.get("Authorization") || ""
    const authHeadParts = authHeader.split(" ") //js function that takes a string and tokenize it on a specific charcter；returns an array of two things - the bear and the jwt
    const token = authHeadParts[0] === "Bearer" ? authHeadParts[1] : null //should be a jwt if bearer

    try {
        const payload = jwt.verify(token, secretKey)
        req.user = payload.sub //make the id available for the rest of the app by storing it in the user req
        req.role = payload.role
        next()
    } catch (e) {
        res.status(401).send({
            error: "Valid authentication token required"
        })
    }

}

exports.verifyToken = function(token) {
    try {
        const payload = jwt.verify(token, secretKey)
            // console.error('Token verification not failed:', payload.sub)
        return payload.sub
    } catch (e) {
        // console.error('Token verification failed:', e.message)
        return null
    }
}