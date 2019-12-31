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
  const _articleList = []
  const res = await Category.findById(ctx.params.id).populate(['parent','article'])
  res.articlies = []
  //找出子分类下的所有文章
  if(res.childList){
    res.childList.map(async (item)=>{
      const res = await Article.find({category:item._id}).populate(['category','tag'])
      if(res._id){
        _articleList.push(res)
      }
    })
  }
  //找出当前分类下的文章
  const articlies = await Article.find({category:ctx.params.id}).populate(['category','tag'])
  //合并到category的articlies下
  res.articlies = res.articlies.concat(_articleList,articlies)
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

//article detail
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
router.get('/comment/:id',async(ctx)=>{
  const res = await Comment.find({article:ctx.params.id,verify:'已审核'})
  ctx.body = res
})

//praise
router.post('/praise/:id',async(ctx)=>{
  await Article.findByIdAndUpdate(ctx.params.id,{$inc:{likes:1}})
  ctx.body = {
    code: 0
  }
})

//likes
router.post('/views/:id',async(ctx)=>{
  await Article.findByIdAndUpdate(ctx.params.id,{$inc:{views:1}})
  ctx.body = {
    code: 0
  }
})
module.exports = router