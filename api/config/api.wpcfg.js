const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals') // 排除第三方库打包进 webpack

module.exports = {
    mode: 'production',
    target: 'node', // 没这条 Express API 会无法执行
    node: {
        __dirname: true, // if you don't put this is, __dirname and __filename return blank
    },

    entry: {
        api: './apiserver.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },

    externals: [
        nodeExternals(), // 忽略掉 node_modules 文件夹下的所有模块
        function({context, request}, cb) {
            if (request.endsWith('commonTools.js')) {
                // 对于任何以 'commonTools.js' 结尾的请求，我们都将其视为外部文件
                return cb(null, 'commonjs ./commonTools.js')
            }
            cb()
        }
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEVELOPMENT__: false
        })
    ],
}
