const Router = require('koa-router')
const router = new Router({
    prefix: '/web/api'
})

const Category = require('../../models/Category')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')
const Message = require('../../models/Message')
const Comment = require('../../models/Comment')

//main
router.get('/main',async(ctx)=>{
  //获取没有parent的分类
  const categories = await Category.find({parent:{$exists:false}})
  //获取所有文章
  const articlies = await Article.find().sort({time:-1}).populate(['tag','category'])
  //最新文章
  const newArticlies = articlies.slice(0,6)
  //实在想不出什么好的办法了 先只能用本这种笨办法了 
  //获取几个分类以及相关文章 tabs
  let tabs = [await getTabs('前端工具'),await getTabs('Less & Sass'),await getTabs('Vue'),await getTabs('JavaScript'),await getTabs('HTML5 & CSS3')]
  async function getTabs(name){
    let tools = {}
    const category = await Category.findOne({name})
    tools.name = category.name
    const articlies = await Article.find({category:category._id}).sort({view:-1}).limit(8)
    tools.left = articlies.slice(6,8)
    tools.right = articlies.slice(0,6)
    return tools
  }
  // cases
  const caseCategory = await Category.findOne({name:'实战案例'})
  let cases = await Article.find({category:caseCategory._id}).limit(6)
  //rank
  const rank = await Article.find().sort({views:-1}).limit(8)
  //hotComment
  const hotComment = await Comment.find({verify:'已审核'}).sort({time:-1}).limit(11).populate('article')
  
  //site
  let site = [await getInfo('文章',Article),await getInfo('分类',Category),await getInfo('标签',Tag),await getInfo('评论',Comment),{name:'访问人数',count:21}]
  async function getInfo(name,model){
    let temp = {}
    let limit = {}
    if(name === '评论'){
      limit = {verify:'已审核'}
    }
    temp.name = name
    temp.count = await model.find(limit).countDocuments()
    return temp
  }
  //tags
  let tags = await Tag.find()
  ctx.body = {
    categories,
    newArticlies,
    tabs,
    cases,
    rank,
    hotComment,
    site,
    tags
  }
})

//category
router.get('/category',async (ctx)=>{
  let res = await Category.find({parent:{$exists:false}})
  ctx.body = res
})
router.get('/category/:id',async (ctx)=>{
  //查找分类
  const res = await Category.findById(ctx.params.id).populate(['parent','article'])
  //查找该分类下的所有文章
  const artList = await Article.find({category:res._id}).populate(['tag','category'])
  let arr = [...res.childList]
  //判断该分类是否有childList
  let tempArr = []
  if(arr[0]){
    for(let i =0; i < arr.length; i++){
      const art = await Article.find({category:arr[i]._id}).populate(['tag','category'])
      tempArr = [...art,...tempArr]
    }
  }
  let articleList = [...artList,...tempArr]
  ctx.body = {
    category:res,
    articleList
  }
})

//tabs
router.get('/tabs',async(ctx)=>{
  const res = await Tag.find()
  ctx.body = res
})
router.get('/tabs/:id',async(ctx)=>{
  const res = await Tag.findById(ctx.params.id)
  const articlies = await Article.find({tag:{_id:ctx.params.id}}).populate(['tag','category'])
  ctx.body = {
    tab: res,
    articlies
  }
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
router.get('/article',async(ctx)=>{
  const articlies = await Article.find().populate(['category','tag'])
  ctx.body = articlies
})
router.get('/article/:id',async(ctx)=>{
  const res = await Article.findById(ctx.params.id).populate(['tag','category'])
  const next = await Article.findOne({_id:{$gt:res._id}})
  const pre = await Article.findOne({_id:{$lt:res._id}}).sort({_id:-1})
  ctx.body = {
    res,
    next,
    pre
  }
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