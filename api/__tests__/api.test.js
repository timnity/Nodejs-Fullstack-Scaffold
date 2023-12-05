
const request = require('superagent')

beforeAll(() => {
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
})

beforeEach(() => {
    //
})

describe('API createUser 测试', () => {
    let userId
    const testUrl = 'http://localhost:3000/api'

    test('创建用户', async () => {
        const res = await request.post(`${testUrl}/createUser`).send({
            loginname: 'test',
            username: '测试',
            password: 'test',
            email: 'test@test.com',
            mobile: '18600000000',
            remark: '备注测试'
        })
        // console.log(res.body)
        userId = res.body.user.userid
        expect(res.body.resCode).toBe(2)
        expect(res.body.user.loginname).toBe('test')
    })

    test('读取用户', async () => {
        const res = await request.post(`${testUrl}/getUser`).send({
            userid: userId
        })
        // console.log(res.body)
        expect(res.body.resCode).toBe(2)
        expect(res.body.user.loginname).toBe('test')
    })

    test('更新用户', async () => {
        const res = await request.post(`${testUrl}/updateUser`).send({
            userid: userId,
            username: '测试更新',
            remark: '备注更新'
        })
        // console.log(res.body.user)
        expect(res.body.resCode).toBe(2)
    })

    test('删除用户', async () => {
        const res = await request.post(`${testUrl}/deleteUser`).send({
            userid: userId
        })
        // console.log(res.body)
        expect(res.body.resCode).toBe(2)
    })
})
