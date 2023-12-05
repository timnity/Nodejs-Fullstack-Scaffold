const Sequelize = require('sequelize')

const { getConn } = require('../utils/DBconn')
const conn = getConn()

const User = conn.define(
    'user',
    {
        userid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
        loginname: { type: Sequelize.STRING, allowNull: false, comment: '登录名' },
        username: { type: Sequelize.STRING, allowNull: false, comment: '用户名' },
        password: { type: Sequelize.STRING, defaultValue: null, comment: '密码' },
        email: { type: Sequelize.STRING, defaultValue: null, comment: '邮箱' },
        mobile: { type: Sequelize.STRING, defaultValue: null, comment: '手机号' },
        remark: { type: Sequelize.STRING, defaultValue: null, comment: '备注' },
        status: { type: Sequelize.STRING, value: [0, 1], defaultValue: 1, comment: '账号状态: 0.锁定 1.正常' },
    },
    { paranoid: true, timestamps: true }
)

module.exports = User
