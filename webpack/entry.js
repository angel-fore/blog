const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const argv = require('yargs').argv
const CLIENT_DEV_PORT = 8080
// 描述环境 ,dev 开发， dist 部署
const env = argv.env
//描述场景 
const stage = argv.stage

// 生产标准配置文件格式
const factoryConfig = (config)=>{
    const defaultConfigStruct = {
        client : {
            dev : {},
            prd : {}
        },
        server : {
            dev : {},
            prd : {}
        }
    }
    Object.assign(config,defaultConfigStruct)
    return config
}

const run = (config) => {
    
    const appPath = process.cwd()
    config = config || {}
    config = factoryConfig(config)

    if(stage=='client' && env=='dev'){
        //客户端开发环境
        let clientDevCfg = require('./client.dev.js', appPath)
        Object.assign(clientDevCfg,config.client.dev)
        const compiler = webpack(clientDevCfg)
        const server = new WebpackDevServer(compiler, {
            quiet: true,
            hot: true,
            inline: true,
            contentBase: './',
            publicPath: '/dist/',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            disableHostCheck: true
        })
        server.listen(CLIENT_DEV_PORT, "0.0.0.0")
        console.log('localhost:'+CLIENT_DEV_PORT)
    }else if(stage=='client' && env=='prd'){
        //客户端生产环境
        let clientPrdCfg = require('./client.prd.js', appPath)
        Object.assign(clientPrdCfg,config.client.prd)
        const compiler = webpack(clientPrdCfg)
        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)
        })
    }
}

run()