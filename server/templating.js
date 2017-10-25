const nunjucks = require('nunjucks')

function createEnv(path,opt){
    const autoescape = opt.autoescape || true,
          throwOnUndefined = opt.throwOnUndefined || false,
          watch = opt.watch || true,
          noCache = opt.noCache || false,
          env = new nunjucks.Environment(
            //加载模板
            new nunjucks.FileSystemLoader(path || 'views',{noCache: noCache, watch: watch}),
            {autoescape:autoescape},
            {throwOnUndefined:throwOnUndefined}
    )
    
    if(opt.filters){
        for(var f in opt.filters){
            env.addFilter(f,filters[f])   //添加名为 f 的自定义过滤器，第二个参数 为调用的函数
        }
    }
    return env
}

function templating(path,opts){
    const env = createEnv(path,opts)
    return async (ctx,next) => {
        // 给ctx绑定render函数:
        ctx.render = function(view,model){
            ctx.response.body = env.render(view,  Object.assign({}, ctx.state || {}, model || {}))
            ctx.response.type = 'text/html'
        }
        // 继续处理请求:
        await next();
    }
    
}

module.exports = templating
