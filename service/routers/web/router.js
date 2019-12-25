const Router = require('koa-router')
const router = new Router({
    prefix: '/web/api'
})

const Category = require('../../models/Category')
const Article = require('../../models/Article')

router.get('/category',async (ctx)=>{
  let res = await Category.find({parent:{$exists:false}})
  ctx.body = res
})

router.get('/category/:id',async (ctx)=>{
  const res = await Category.findById(ctx.params.id).populate(['category','article'])
  ctx.body = res
})
module.exports = router