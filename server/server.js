/* 入口文件 */

const Koa = require( "koa" )
const path = require("path")
const bodyParser = require('koa-bodyparser')
const koaViews = require('koa-views')
const koaStatic = require('koa-static')
const controller = require( "./controller")

const app = new Koa(); 
app.use(bodyParser())
app.use(controller());  //路由


app.listen( 3000 );


