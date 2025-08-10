const { DataTypes } = require('sequelize')

const bcrypt = require('bcryptjs')

const sequelize = require('../lib/sequelize')
const { Assignment } = require('./assignments')
const { Course } = require('./courses')
const { Submission } = require('./submissions')

const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, allowNull: false }, //full name of user
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'instructor', 'student'), allowNull: false, defaultValue: 'student' }
})

exports.User = User

User.hasMany(Course);
Course.belongsTo(User, { as: 'Instructor', foreignKey: 'instructorId' })


exports.insertNewUser = async function(user) {
    const hash = await bcrypt.hash(user.password, 8) //hash the password when add a new user
    user.password = hash
    const result = await User.create(user, UserClientFields)
    return result.id
}

exports.UserClientFields = [
    'name',
    'email',
    'password',
    'role'
]