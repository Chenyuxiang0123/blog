const Koa = require('koa')
const router = require('koa-router')()
const cors = require('koa-cors')
const json = require('koa-json')
const bodyparse = require('koa-body')

const app = new Koa()

app.use(cors()) //跨域
app.use(json()) // 处理json数据
app.use(bodyparse()) //处理post请求的数据

app.use(require('koa-static')(__dirname + '/public')) //访问静态资源

require('./dbs/index')(app) //连接数据库

const admin = require('./routers/admin/router')
router.use(admin.routes()) //启用后端路由

const web = require('./routers/web/router')
router.use(web.routes())  //启用前端路由

app.use(router.routes()).use(router.allowedMethods()) //开启路由

app.listen(3000,async ()=>{
    console.log('http://localhost:3000')
})