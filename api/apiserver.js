const http = require('http')
const express = require('express')

const config = require('./config/apiconfig.js')
const { opLogger } = require('./src/utils/commonTools.js')

const app = express()

const env = process.env.NODE_ENV || 'development'
const port = config.apiport || 3000

// init express and routes
require('./server/api-express')(express, app, env)
require('./server/api-routes')(express, app, env, config)

// create server
const server = http.createServer(app)
server.listen(port, () => {
    opLogger(`==> 🌐  ${config.name} 服务启动. URL=http://localhost:${port}/api, ENV=${env}`)
})
