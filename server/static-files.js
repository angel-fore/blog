//也可以去npm搜索能用于koa2的处理静态文件的包并直接使用
const path = require('path')
const fs =  require('mz/fs')
const mime = require('mime')

//参数：argv1:静态资源请求url的开头   argv2:静态资源文件所在的位置
function staticFiles(url,dir){
    return async (ctx,next) => {
        const fPath = ctx.request.path
        // 判断是否以指定的url开头:
        if(fPath.startsWith(url)){
            // 获取文件完整路径:
            const dirFile = path.join(dir,fPath.substring(url.length))
            // 判断文件是否存在:
            var hasFile = await fs.exists(dirFile) 
            if(hasFile){
                // 查找文件的mime:
                ctx.response.type = mime.getType(fPath)
                ctx.response.body = await fs.readFile(dirFile)
            }else{
                ctx.response.status = 404;
            }
        }else{
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next()
        }
    }
}

module.exports = staticFiles