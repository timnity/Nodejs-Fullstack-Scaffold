const compression = require('compression') // Http Request 压缩
const cookieParser = require('cookie-parser')
const errorhandler = require('errorhandler')
const cors = require('cors')
const helmet = require('helmet')
const { setExpressLogger } = require('../src/utils/commonTools.js')


module.exports = (express, app, env) => {
    // 从 X-Forwarded-For 头部获取真实的客户端 IP 地址
    app.set('trust proxy', 1) // 信任反向代理层,即Nginx,用于 Https 的信任

    // 初始化 req 请求日志
    setExpressLogger(app)

    // 从 Express 4.16.0 版本开始, body-parser 中间件已经内置到 express 中,不需要再单独安装
    app.use(express.json())
    app.use(express.urlencoded({ extended: true })) // 解析请求体

    // 使用 cookieParser 中间件来解析 cookie
    app.use(cookieParser())

    // 使用 compression 中间件来启用 GZIP 压缩, 仅压缩响应体大于 512 字节的响应数据
    app.use(compression({ threshhold: 512 }, (req, res) => /json|text|javascript|css/.test(res.getHeader('Content-Type')), { level: 9 })) // 压缩级别为 9

    // 使用 helmet 中间件来增加一些安全性头部
    app.use(helmet())

    /**
     * 当浏览器发送跨域请求时，如果该请求不是简单请求，浏览器会首先发送一个 HTTP OPTIONS 请求，这被称为预检请求。预检请求用于检查实际请求是否被服务器允许.
     * 这段代码检查每个进入的请求是否为 OPTIONS 请求。如果是，它设置 Access-Control-Max-Age 响应头为 7200 秒（2小时），这告诉浏览器在这段时间内无需再发送预检请求
     * 如果请求不是 OPTIONS 请求，它调用 next() 函数将请求传递给下一个中间件或路由处理程序.
     * 预检请求会生成对应的一次性 session,需要手动销毁（不然 redis 会看到一大堆的无效 session）
     */
    // app.use((req, res, next) => {
    //     if (req.method === 'OPTIONS') {
    //         res.header('Access-Control-Max-Age', 7200)
    //         res.status(200).end()
    //         return
    //     }
    //     next()
    // })

    // 使用 cors 中间件来启用 CORS, maxAge 为预检请求的有效期, 单位为秒. 等效上面预检代码
    app.use(cors({ maxAge: 7200 }))


    if (env === 'development') {
        // Express 会以格式化（pretty-print）的形式输出 HTML，这使得 HTML 源代码更易于阅读和调试。
        app.locals.pretty = true

        // dumpExceptions: true 选项会导致错误处理器将异常信息打印到控制台，
        // showStack: true 选项则会导致它显示堆栈跟踪。
        app.use(errorhandler({ dumpExceptions: true, showStack: true })) // 开发环境错误处理
    }
}