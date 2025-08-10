const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')
const { Assignment } = require('./assignments')
const { Course } = require('./courses')
const { User } = require('./users')

const Submission = sequelize.define('submission', {
    studentId: { type: DataTypes.STRING, allowNull: false },
    assignmentId: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    file: { type: DataTypes.STRING.BINARY, allowNull: false },
    grade: { type: DataTypes.FLOAT, allowNull: false },
})

User.hasMany(Submission, { foreignKey: { allowNull: false } })
Submission.belongsTo(User)

Assignment.hasMany(Submission, { foreignKey: { allowNull: false } })
Submission.belongsTo(Assignment)

exports.Submission = Submission

exports.SubmissionClientFields = [
    'studentId',
    'assignmentId',
    'timestamp',
    'file',
    'grade',
]