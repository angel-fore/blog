const router = require( "koa-router")()
const fs = require('fs')
const path = require('path')

//router.get(url,function)

// 先导入fs模块，然后用readdirSync列出文件
let files = fs.readdirSync(path.resolve(__dirname,'../controllers'))
// 过滤出.js文件:
files = files.filter((file)=>{
    return file.endsWith('.js')
})
// 处理每个js文件:
for(let i=0,l=files.length; i<l; i++){
    //console.log(`process controller:${files[i]}...`);
    const moudle = require(path.resolve(__dirname, '../controllers/'+files[i]))
    for(let url in moudle){
        const value = moudle[url]
        if(url.startsWith('GET')){
            let path = url.substring(4)
            router.get(path,value)
        }else if(url.startsWith('POST')){
            let path = url.substring(5)
            router.post(path,value)
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

// console.log(router)
// console.log(router.routes())

module.exports = function(){
    return router.routes()
}