/* 入口文件 */

const Koa = require( "koa" )
const path = require("path")
const bodyParser = require('koa-bodyparser')
const koaViews = require('koa-views')
const koaStatic = require('koa-static')
const controller = require( "./controller")
const templating = require('./templating')
const argv = require('yargs').argv

const app = new Koa(); 
const isProduction = argv.env === 'prd'

//middleware处理静态文件
if (!isProduction) {    
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', path.resolve(__dirname,'../static')))
}
//middleware解析POST请求
app.use(bodyParser())

//middleware负责给ctx加上render()来使用Nunjucks：
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//middleware处理路由
app.use(controller());  

app.listen( 3000 );

console.log('app started at port 3000...');


