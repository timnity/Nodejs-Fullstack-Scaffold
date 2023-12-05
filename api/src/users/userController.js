
const { opLogger } = require('../utils/commonTools.js')

const UserOperate = require('./userOperate.js')

// 创建用户
exports.createUser = async (req, res) => {
    const { loginname, username, password, email, mobile, remark } = req.body

    try {
        if (!loginname && !password) {
            res.status(200).json({ resCode: 99, resMsg: '用户名和密码不能为空!' })
            return
        }
        const userData = { loginname, username, password, email, mobile, remark }

        const result = await UserOperate.createUser(userData)

        res.status(200).json({ resCode: 2, user: result })
    } catch (error) {
        res.status(200).json({ resCode: 99, resMsg: 'Catch error, failed to create user' })
    }
}

// 获取用户
exports.getUser = async (req, res) => {
    const { userid } = req.body

    try {
        const result = await UserOperate.getUser(userid)
        res.status(200).json({ resCode: 2, user: result })
    } catch (error) {
        res.status(200).json({ resCode: 99, resMsg: 'Catch error, failed to get user' })
    }
}

// 更新用户
exports.updateUser = async (req, res) => {
    const { userid, username, password, email, mobile, remark } = req.body

    try {
        const userData = { username, password, email, mobile, remark }
        const result = await UserOperate.updateUser(userid, userData)
        res.status(200).json({ resCode: 2, user: result })
    } catch (error) {
        res.status(200).json({ resCode: 99, resMsg: 'Catch error, failed to update user' })
    }
}

// 删除用户
exports.deleteUser = async (req, res) => {
    const { userid } = req.body

    try {
        await UserOperate.deleteUser(userid)
        res.status(200).json({ resCode: 2 })
    } catch (error) {
        res.status(200).json({ resCode: 99, resMsg: 'Catch error, failed to delete user' })
    }
}
