
const User = require('./userModel.js')

const { getConn } = require('../utils/DBconn.js')
const conn = getConn()


exports.createUser = (userData) => {
    return User.create(userData)
}

exports.getUser = (userid) => {
    return User.findOne({ where: { userid } })
}

exports.updateUser = (userid, userData) => {
    return User.update(userData, { where: { userid } })
}

exports.deleteUser = (userid) => {
    return User.destroy({ where: { userid } })
}
