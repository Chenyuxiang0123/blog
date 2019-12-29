const Router = require('koa-router')
const router = new Router({
    prefix: '/web/api'
})

const Category = require('../../models/Category')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')
const Message = require('../../models/Message')
const Comment = require('../../models/Comment')

//category
router.get('/category',async (ctx)=>{
  let res = await Category.find({parent:{$exists:false}})
  ctx.body = res
})
router.get('/category/:id',async (ctx)=>{
  const res = await Category.findById(ctx.params.id).populate(['parent','article'])
  ctx.body = res
})

//tabs
router.get('/tabs',async(ctx)=>{
  const res = await Tag.find()
  ctx.body = res
})
router.get('/tabs/:id',async(ctx)=>{
  const res = await Tag.findById(ctx.params.id)
  ctx.body = res
})

//message
router.post('/message',async(ctx)=>{
  const res = await Message.create(ctx.request.body)
  if(res){
    ctx.body = {
      code: 0,
      type: 'success',
      message: '留言成功！！！'
    }
  }else{
    ctx.body = {
      code: -1,
      type: 'error',
      message: '留言失败！！！'
    }
  }
})
router.get('/message',async(ctx)=>{
  //$ne 匹配键值不等于指定值的文档
  const res = await Message.find({verify:{$ne:'未审核'}})
  ctx.body = res
})

//article
router.get('/article/:id',async(ctx)=>{
  const res = await Article.findById(ctx.params.id).populate(['category','tag'])
  ctx.body = res
})

//comment
router.post('/comment',async(ctx)=>{
  await Comment.create(ctx.request.body)
  ctx.body = {
    type: 'success',
    message: '评论提交成功！！！',
    code: 0
  }
})
module.exports = router