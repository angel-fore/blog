const webpack = require('webpack')
const common = require('./common')
const path = require('path')

const config = {
    entry : path.resolve(__dirname,'../app/main'),
    output : {
        path : path.resolve(__dirname,'../dist'),
        filename : '[name].js',
        publicPath : '/'
    },
    resolve: {
        extensions: ['.js', 'jsx', '.json']
    },
    module : {
        rules : common.rules
    },
    plugins: common.plugins
}
module.exports = config