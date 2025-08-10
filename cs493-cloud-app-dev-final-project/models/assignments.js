const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')
const { Course } = require('./courses')
const { Submission } = require('./submissions')
const { User } = require('./users')

const Assignment = sequelize.define('assignment', {
    courseId: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    due: { type: DataTypes.STRING, allowNull: false } //($date-time)
})
exports.Assignment = Assignment

exports.AssignmentClientFields = [
    'courseId',
    'title',
    'points',
    'due',
];