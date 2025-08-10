require('dotenv').config()


const express = require('express')
const morgan = require('morgan')

const redis = require("redis")
const api = require('./api')
const sequelize = require('./lib/sequelize')

const app = express()
const port = process.env.PORT || 8000

const redisHost = process.env.REDIS_HOST || "localhost"
const redisPort = process.env.REDIS_PORT || 6379

const redisClient = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`
})

let rateLimitMaxReqs = 10 //unauthorized - default 
const rateLimitWindowMs = 60000 //one minute

async function rateLimit(req, res, next) {
    const ip = req.ip
    let identifier = `ip-${ip}`

    const authHeader = req.get("Authorization") || ""
    const authHeadParts = authHeader.split(" ") //js function that takes a string and tokenize it on a specific charcter；returns an array of two things - the bear and the jwt
    const token = authHeadParts[0] === "Bearer" ? authHeadParts[1] : null //should be a jwt if bearer


    const userId = await verifyToken(token)

    if (userId) {
        identifier = `user-${userId}`
        rateLimitMaxReqs = 30
    }


    let tokenBucket
    try {
        tokenBucket = await redisClient.hGetAll(identifier) || {} //hset provides us with entire hash for thatt key
    } catch (e) {
        console.error('Redis error:', e.message)
        next() //if it crashes, it will be like it wasn't set up
        return

    }

    tokenBucket = {
        tokens: parseFloat(tokenBucket.tokens) || rateLimitMaxReqs,
        last: parseInt(tokenBucket.last) || Date.now()
    }

    const timestamp = Date.now()
    const ellapsedTimeMs = timestamp - tokenBucket.last
    const refreshRate = rateLimitMaxReqs / rateLimitWindowMs
    tokenBucket.tokens += ellapsedTimeMs * refreshRate
    tokenBucket.tokens = Math.min(rateLimitMaxReqs, tokenBucket.tokens)
    tokenBucket.last = timestamp

    if (tokenBucket.tokens >= 1) {
        tokenBucket.tokens -= 1
        await redisClient.hSet(identifier, [
            ['tokens', tokenBucket.tokens],
            ['last', tokenBucket.last]
        ])
        next()
    } else {
        res.status(429).send({
            err: "Too many requests per minute"
        })
    }
}

app.use(rateLimit)

app.use(morgan('dev'))

app.use(express.json())

app.use('/', api)

app.use('*', function(req, res, next) {
    res.status(404).send({
        error: `Requested resource "${req.originalUrl}" does not exist`
    })
})

app.use('*', function(err, req, res, next) {
    console.error("== Error:", err)
    res.status(500).send({
        // error: "Server error.  Please try again later."
        error: err.message
    })
})

const startServer = async() => {
    try {
        await redisClient.connect()
        console.log("== Redis connected successfully")

        await sequelize.sync()
        console.log("== Sequelize connected successfully")

        app.listen(port, () => {
            console.log("== Server is running on port", port)
        })

    } catch (e) {
        console.error("Failed to start the server", e)
    }
}

startServer();