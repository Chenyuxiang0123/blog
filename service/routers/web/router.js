const Router = require('koa-router')
const router = new Router({
    prefix: '/api/web'
})

const Category = require('../../models/Category')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')
const Message = require('../../models/Message')
const Comment = require('../../models/Comment')
const User = require('../../models/User')

const getIp = require('../../middleware/getIp')

//main
router.get('/main',async(ctx)=>{
  //获取没有parent的分类
  const categories = await Category.find({parent:{$exists:false}}).sort({time:1}) || []
  //获取所有文章
  const articlies = await Article.find().sort({time:-1}).populate(['tag','category']) || []
  //最新文章
  const newArticlies = articlies.slice(0,6)
  //获取几个分类以及相关文章 tabs
  let cateList = ['前端工具', 'Less & Sass','Vue','JavaScript','HTML5 & CSS3']
  let tabs = []
  for(let i = 0; i < cateList.length; i++){
    let list = await getTabs(cateList[i])
    tabs.push(list)
  }
  async function getTabs(name){
    let tools = {}
    const category = await Category.findOne({name})
    tools.name = name
    if(category._id){
      const articlies = await Article.find({category:category._id}).sort({view:-1}).limit(8)
      tools.left = articlies.slice(6,8)
      tools.right = articlies.slice(0,6)
    }
    return tools
  }
  // cases
  const caseCategory = await Category.findOne({name:'实战案例'})
  let cases = []
  if(caseCategory){
    cases = await Article.find({category:caseCategory._id}).limit(6)
  }
  //rank
  const rank = await Article.find().sort({views:-1}).limit(8) || []
  //hotComment
  const hotComment = await Comment.find({verify:'已审核'}).sort({time:-1}).limit(11).populate('article') || []
  
  //site
  let siteList = ['文章','分类','标签','留言','评论','访问人数']
  let site = []
  for(let i = 0; i < siteList.length; i++){
    let list = await getInfo(siteList[i])
    site.push(list)
  }
  async function getInfo(name){
    let temp = {}
    let limit = {}
    temp.name = name
    switch(name){
      case '文章':
        temp.count = await Article.find(limit).countDocuments()
        break;
      case '分类':
        temp.count = await Category.find(limit).countDocuments()
        break;
      case '标签':
        temp.count = await Tag.find(limit).countDocuments()
        break;
      case '留言':
        temp.count = await Message.find(limit).countDocuments()
        break;
      case '评论':
        temp.count = await Comment.find({verify:'已审核'}).countDocuments()
        break;
      case '访问人数':
        temp.count = await User.find(limit).countDocuments()
        break;
    }
    return temp
  }
  //tags
  let tags = await Tag.find() || []
  //创建用户
  let IPAdress = getIp()
  let user = await User.findOne({ip:IPAdress})
  if(!user){
    await User.create({ip:IPAdress})
  }
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

//categoryd
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
  let ip = getIp()
  let _user = await User.find({ip})
  
  if(!_user.name){
    let user = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar: ctx.request.body.avatar
    }
    //更新用户信息
    let res = await User.findByIdAndUpdate(_user,user)
  }
  ctx.request.body.ip = ip
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
  let ip = getIp()
  let article = await Article.findById(ctx.params.id)
  let likeUser = await User.findOne({ip,'like.article':article.title})
  let viewUser = await User.findOne({ip,'view.article':article.title})
  let time = new Date()
  let likeFlag
  let viewFlag
  if(likeUser){
    likeUser.like.forEach(item=>{
      if(item.article === article.title){
        likeFlag = time - item.time >= 24*60*60*1000
      }
    })
  }else{
    likeFlag = true
  }
  if(viewUser){
    viewUser.view.forEach(item=>{
      if(item.article === article.title){
        viewFlag = time - item.time >= 24*60*60*1000
      }
    })
  }
  if(viewFlag){
    //时间大于等于24小时 再次浏览文章时文章阅读量 +1
    await User.findByIdAndUpdate(viewUser._id,{$pull:{view:{article:article.title}}})
  }
  if(likeFlag){
    //时间大于等于24小时 点赞功能开启
    await Article.findByIdAndUpdate(ctx.params.id,{$set:{flag:true}})
    if(likeUser){
      await User.findByIdAndUpdate(likeUser._id,{$pull:{like:{article:article.title}}})
    }
  }
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
  let ip = getIp()
  ctx.request.body.ip = ip
  let _user = await User.find({ip})
  if(!_user.name){
    let user = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar: ctx.request.body.avatar,
      time: new Date()
    }
    //更新用户信息
    await User.findByIdAndUpdate(_user,user)
  }
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
  let ip = getIp()
  let time = new Date()
  let article = await Article.findById(ctx.params.id)
  let user = await User.findOne({ip})
  if(!user.like[0]){//user.like中没有数据
    let data = {
      article: article.title,
      time
    }
    await User.findByIdAndUpdate(user._id,{$push:{like:data}})
    await Article.findByIdAndUpdate(ctx.params.id,{$inc:{likes:1}})
    await Article.findByIdAndUpdate(article._id,{$set:{flag:false}})
    ctx.body = {
      code: true
    }
  }else{//user.like中有数据
    let _user = await User.findOne({ip,'like.article':article.title})
    if(_user){//_user存在
      ctx.body = {
        code: false
      }
    }else{//_user不存
      let data = {
        article: article.title,
        time
      }
      await User.findByIdAndUpdate(user._id,{$push:{like:data}})
      await Article.findByIdAndUpdate(ctx.params.id,{$inc:{likes:1}})
      await Article.findByIdAndUpdate(article._id,{$set:{flag:false}})
      ctx.body = {
        code: true
      }
    }
  }
})

//views
router.post('/views/:id',async(ctx)=>{
  let ip = getIp()
  let time = new Date()
  let article = await Article.findById(ctx.params.id)
  let user = await User.findOne({ip})
  if(!user.view[0]){//user.view中没有数据
    let data = {
      article: article.title,
      time
    }
    await User.findByIdAndUpdate(user._id,{$push:{view:data}})
    await Article.findByIdAndUpdate(article._id,{$inc:{views:1}})
    ctx.body = {
      code: true
    }
  }else{//user.view中有数据
    let _user = await User.findOne({ip,'view.article':article.title})
    if(_user){//_user存在
      ctx.body = {
        code: false
      }
    }else{//_user不存
      let data = {
        article: article.title,
        time
      }
      await User.findByIdAndUpdate(user._id,{$push:{view:data}})
      await Article.findByIdAndUpdate(article._id,{$inc:{views:1}})
      ctx.body = {
        code: true
      }
    }
  }
})

//search
router.post('/search',async(ctx)=>{
  let res = {}
  let value = ctx.request.body.value
  console.log(ctx.request.body);
  
  let reg = value
  if(value === 'js'){
    reg = "javascript"
  }
  let articlies = await Article.find({title:{$regex:`${reg}`,$options:'i'}}).populate(['tag','category'])

  let cate = await Category.find({name:{$regex:`${reg}`,$options:'i'}})
  let tag = await Tag.find({name:{$regex:`${reg}`,$options:'i'}})
  let articleCate = []
  let articleTag = []
  if(cate.length){
    let temp 
    for(let i = 0; i < cate.length; i++){
      temp = await Article.find({category:cate[i]._id}).populate(['tag','category'])
      articleCate = [...articleCate,...temp]
    }
  }
  if(tag.length){
    for(let i = 0; i < cate.length; i++){
      let temp 
      temp = await Article.find({tag:tag[i]._id}).populate(['tag','category'])
      articleTag = [...articleTag,...temp]
    }
  }
  let arr = [...articlies,...articleCate,...articleTag]
  function deteleObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
      var keys = Object.keys(obj[i]);
      keys.sort(function(a, b) {
        return (Number(a) - Number(b));
      });
      var str = '';
      for (var j = 0; j < keys.length; j++) {
        str += JSON.stringify(keys[j]);
        str += JSON.stringify(obj[i][keys[j]]);
      }
      if (!stringify.hasOwnProperty(str)) {
        uniques.push(obj[i]);
        stringify[str] = true;
      }
    }
    uniques = uniques;
    return uniques;
  }
  let newArr = deteleObject(arr)
  res.value = value
  res.articlies = newArr
  ctx.body = res
})

//user
router.get('/user/:name',async (ctx)=>{
  let ip = getIp()
  let user = await User.findOne({name:ctx.params.name})
  if(user && ip !== user.ip){
    ctx.body = {
      code: -1,
      type: 'error',
      message: '该昵称已被使用！！！'
    }
  }else{
    ctx.body = {
      code: 0
    }
  }
})
router.get('/user',async (ctx)=>{
  let ip = getIp()
  let user = await User.findOne({ip})
  ctx.body = user
})
module.exports = router