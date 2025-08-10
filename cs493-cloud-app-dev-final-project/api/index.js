const { Router } = require('express')

const assignmentsRouter = require('./assignments')
const coursesRouter = require('./courses')
const submissionRouter = require('./submissions')
const usersRouter = require('./users')


const router = Router()

router.use('/assignments', assignmentsRouter)
router.use('/courses', coursesRouter)
router.use('/submissions', submissionRouter)
router.use('/users', usersRouter)

module.exports = router