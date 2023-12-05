const Sequelize = require('sequelize')

const { sqlLogger } = require('./commonTools.js')

const config = require('../../config/apiconfig.js')

const printSqlLogger = (msg, benchmark) => {
    sqlLogger(msg, benchmark)
}

/*
 * 数据库连接工具
 * 不要把 DB 相关调用放到 backTools.js 中, 由于数据库连接需要持久化, 贯穿整个项目使用周期.
 * 放到工具类中, 每次调用都必须重新创建连接, 这样会导致连接池失效, 性能严重下降.
 */
const conn = new Sequelize(config.db_database, config.db_username, config.db_password, {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect,
    pool: {
        maxConnections: config.db_maxConnection,
        maxIdleTime: config.db_maxIdleTime,
    },
    dialectOptions: {
        charset: config.db_charset,
        // typeCast默认值为true, 实际使用中必须明确设置, 才能将数据做强制转换。
        dateStrings: true, // 强制日期类型(时间戳，日期时间，日期)作为字符串返回而不是将其注入到JavaScript日期对象中
        typeCast: true, // 日期和GEOMETRY 型会默认进行类型转换. 设置为true是关闭转换, 保证时间戳类型的字段不会被转换为 JS Date 类型(难处理)
    },
    timezone: '+08:00',
    benchmark: true, // 打印 sql 执行时间
    logQueryParameters: true, // 绑定 sql 参数到日志中，避免出现参数为 ? 无法使用日志还原数据的问题
    logging: printSqlLogger,
})

exports.getConn = () => {
    if (conn === null) {
        throw new Error('Database connection is not initialized.')
    }
    return conn
}
