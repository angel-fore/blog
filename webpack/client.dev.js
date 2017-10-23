const webpack = require('webpack')
const common = require('./common')
const path = require('path')

const config = {
    entry : [
        path.resolve(__dirname,'../app/main'),
        //我们app的入口文件
    ],
    output : {
        path : path.resolve(__dirname,'../dist'),
        filename : '[name].js',
        publicPath : '/'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', 'jsx', '.json']
    },
    module : {
        rules : common.rules
    },
    plugins: common.plugins
}

module.exports = config
