/*
项目配置参数写到 .env 文件中, 确保配置参数不会打包到代码中
用 dotenv 读取相应的 .env 环境变量
不要把 .env 配置文件上传 git
不要用聊天工具传输 .env 配置文件
*/
const path = require('path')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
    name: `${process.env.PROJECT_NAME} API Server`,

    /* 服务端口 */
    apiport: process.env.API_PORT || 3000,

    /* 项目配置 */
    rootPath: path.resolve(__dirname, '../../'),
    secret: process.env.SECRET,

    /* 数据库配置 */
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_dialect: process.env.DB_DIALECT,
    db_database: process.env.DB_DATABASE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_maxConnection: process.env.DB_MAX_CONNECTION,
    db_maxIdleTime: process.env.DB_MAX_IDLE_TIME,
    db_charset: process.env.DB_CHARSET,

    /* redis配置 */
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    redis_db: process.env.REDIS_DB,
    redis_pwd: process.env.REDIS_PWD,
}
