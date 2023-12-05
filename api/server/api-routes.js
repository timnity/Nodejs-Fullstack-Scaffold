
const userController = require(`../src/users/userController.js`)

/**
 * @namespace API-Core
 * @summary
 * <b>API 核心接口 version: 1.0.0 </b></br>
 * <span style="color:red">注意：API路由并发大，不要在路由中使用 async 同步方法，否则会有数十倍的性能下降！</span><br/>
 * @property {string} statusCode - 只要服务器有返回, 就是200
 * @property {number} resCode - 响应代码, 也作为错误代码
 * @property {string} resMsg - 响应消息
 */
module.exports = (express, app, env, config) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.json('Hello World!')
    })

    router.post('/createUser', userController.createUser)
    router.post('/getUser', userController.getUser)
    router.post('/updateUser', userController.updateUser)
    router.post('/deleteUser', userController.deleteUser)

    // 以上路由全部未命中的处理,放最后
    router.use((req, res) => {
        res.status(404).json({
            resCode: 404,
            resMsg: `Sorry! ${req.originalUrl || req.baseUrl} does not exist! 抱歉！路由${req.originalUrl || req.baseUrl}不存在！`
        })
    })

    /**
     * @memberof API-Core
     * @name 路由前缀
     * @summary
     * 路由前缀为: <span style="color:red"><b> /api </b></span><br/>
     * @example
     * POST http://localhost:3000/api/getSomeData
     */
    app.use('/api', router)
}
