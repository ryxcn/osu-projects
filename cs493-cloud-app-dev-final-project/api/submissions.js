const { Router } = require('express')
const { ValidationError } = require('sequelize')

const router = Router()

const { requireAuthentication } = require('../lib/auth')