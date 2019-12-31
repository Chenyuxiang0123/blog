const Router = require('koa-router')
const router = new Router({
    prefix: '/admin/api'
})

const Category = require('../../models/Category')
const Tag = require('../../models/Tag')
const Article = require('../../models/Article')
const Message = require('../../models/Message')
const Comment = require('../../models/Comment')

//categry
router.post('/category', async (ctx) =>{
    if(!ctx.request.body.name){
        ctx.body = {
            code: -1,
            message: '请输入分类名称！！',
            type: 'error'
        }
    }else{
        let _model = await Category.findOne(ctx.request.body)
        if(_model){
            ctx.body = {
                code: -1,
                message: '该分类已存在！！',
                type: 'warning'
            }
        }else{
            const res = await Category.create(ctx.request.body)
            if(res.parent){
                await Category.findByIdAndUpdate(res.parent,{$push:{childList:res}})
            }
            ctx.body = {
                code: 0,
                message: '分类创建成功！！',
                type: 'success'
            }
        }
    }
})
router.put('/category/:id', async (ctx) =>{
    const res = await Category.findById(ctx.params.id).populate('parent')
    //查找该分类下的所有文章
    const articlies = await Article.find({category:ctx.params.id})
    // 该分类有parent
    if(res.parent){
        //原来上级分类articlies -1
        articlies.map(async()=>{
            await Category.findByIdAndUpdate(res.parent,{$inc:{articlies:-1}})
        })
        //请求体中有parent
        if(ctx.request.body.parent){
            // 更新分类
            await Category.findByIdAndUpdate(ctx.params.id,ctx.request.body)
            //重新查找该分类
            const _res = await Category.findById(ctx.params.id).populate('parent')
            // 从原来的上级分类中删除该分类
            await Category.findByIdAndUpdate(res.parent._id,{$pull:{childList:{_id:res._id}}},{multi: true})
            //保存新上级分类的childList
            const list = _res.parent.childList
            //childlist 为空 则直添加
            if(!list.length){
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$push:{childList:_res}},{ multi: true })
            }else{
                let flag
                list.map(async(item)=>{
                    //childList中有该子分类 则先删除 在添加
                    if(String(item._id) === ctx.params.id){
                        flag = true
                    }else{
                        flag = false
                    }
                })
                if(flag){
                    await Category.findByIdAndUpdate(ctx.request.body.parent,{$pull:{childList:{_id:item._id}}},{ multi: true })
                }
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$push:{childList:_res}},{ multi: true })
            }
            //新的上级分类 articlies +1
            articlies.map(async()=>{
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$inc:{articlies:1}})
            })
        }else{// 请求体中没有parent
            //先删除请求体中的parent
            delete ctx.request.body.parent
            // 在删除该分类的parent
            await Category.findByIdAndUpdate(ctx.params.id,{$unset:{'parent':''}})
            //然后在更新分类
            await Category.findByIdAndUpdate(ctx.params.id,ctx.request.body)
            //删除上级分类中该子分类
            await Category.findByIdAndUpdate(res.parent._id,{$pull:{childList:{_id:res._id}}},{ multi: true })
        }
    }else{//该分类没有parent
        //请求体中有parent
        if(ctx.request.body.parent){
            //更新该分类
            await Category.findByIdAndUpdate(ctx.params.id,ctx.request.body)
            //上级分类articlies +1
            articlies.map(async()=>{
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$inc:{articlies:1}})
            })
            //重新查找该分类
            const cate = await Category.findById(ctx.params.id).populate('parent')
            //保存新上级分类的childList
            const list = cate.parent.childList
            //childlist 为空 则直添加
            if(!list.length){
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$push:{childList:cate}},{ multi: true })
            }else{
                let flag
                list.map((item)=>{
                    //childList中有该子分类 则先删除 在添加
                    if(String(item._id) === ctx.params.id){
                        flag = true
                    }else{
                        flag = false
                    }
                })
                if(flag){
                    await Category.findByIdAndUpdate(ctx.request.body.parent,{$pull:{childList:{_id:item._id}}})
                }
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$push:{childList:cate}},{ multi: true })
            }
        }else{ //请求体中没有parent
            //更新该分类
            await Category.findByIdAndUpdate(ctx.params.id,ctx.request.body)
        }
    }
    ctx.body = {
        code: 0,
        message: '分类修改成功！！',
        type: 'success'
    }
})
router.get('/category', async (ctx) =>{
    let list = await Category.find().populate('parent')
    ctx.body = list
})
router.get('/category/parent',async(ctx)=>{
    const list = await Category.find({parent:{$exists:false}})
    ctx.body = list
})
router.get('/category/:id',async (ctx)=>{
    let data = await Category.findById(ctx.params.id).populate('parent')
    ctx.body = data
})
router.delete('/category/:id',async (ctx) =>{
    //删除分类
    const res = await Category.findByIdAndDelete(ctx.params.id)
    //找到该分类下的所有文章
    const articlies = await Article.find({category:res.id})
    articlies.map(async(item)=>{
        //删除文章
        const art = await Article.findByIdAndDelete(item._id)
        //标签articlies -1
        art.tag.map(async(item)=>{
            await Tag.findByIdAndUpdate(item,{$inc:{articlies:-1}})
        })
    })
    //判断该分类是否有子分类
    if(res.childList){
        res.childList.map(async(item)=>{
            //删除和子分类有关的文章
            await Category.findByIdAndDelete(item._id)
            const art = await Article.find({category:item})
            art.map(async(item)=>{
                const res = await Article.findByIdAndDelete(item._id)
                //标签articlies -1
                res.tag.map(async(item)=>{
                    await Tag.findByIdAndUpdate(item,{$inc:{articlies:-1}})
                })
            })
        })
    }
    ctx.body = {
        code: 0,
        message: '删除成功！！！',
        type: 'success'
    }
})

//tag
router.post('/tag',async(ctx)=>{
    await Tag.create(ctx.request.body)
    ctx.body = {
        code: 0,
        message: '标签创建成功！！',
        type: 'success'
    }
})
router.get('/tag',async(ctx)=>{
    let tag = await Tag.find()
    ctx.body = tag
})
router.get('/tag/:id',async(ctx)=>{
    let tag = await Tag.findById(ctx.params.id)
    ctx.body = tag
})
router.put('/tag/:id',async(ctx)=>{
    await Tag.findByIdAndUpdate(ctx.params.id,ctx.request.body)
    ctx.body = {
        code: 0,
        message: '分类修改成功！！',
        type: 'success'
    }
})
router.delete('/tag/:id',async(ctx)=>{
    // 删除tag
    const res = await Tag.findByIdAndDelete(ctx.params.id)
    //查找所有相关的文章
    const articlies = await Article.find({tag:{_id:res._id}})
    // 删除所有文章中tag
    articlies.map(async(item)=>{
        //删除tag
        await Article.findByIdAndUpdate(item._id,{$pull:{tag:{_id:res._id}}})
        // 重新查找文章
        const result = await Article.findById(item._id).populate('tag')
        //判断文章的Tag的个数
        //0个则删除文章
        if(!result.tag.length){ 
            await Article.findByIdAndUpdate(item._id,{$set:{tag:[]}})
        }
    })
    ctx.body = {
        code: 0,
        type: 'success',
        message: '删除成功！！！'
    }
})

//article
router.post('/article',async(ctx)=>{
    const markdown = require('markdown').markdown
    ctx.request.body.html = markdown.toHTML(ctx.request.body.content)
    // 保存文章
    await Article.create(ctx.request.body)
    //分类articlies +1
    const cate = await Category.findByIdAndUpdate(ctx.request.body.category,{$inc:{articlies:1}})
    //标签articlies +1
    ctx.request.body.tag.map(async(item)=>{
        await Tag.findByIdAndUpdate(item,{$inc:{articlies:1}})
    })
    //判断分类有没有上级分类 有则articlies +1
    if(cate.parent){
        await Category.findByIdAndUpdate(cate.parent,{$inc:{articlies:1}})
    }
    ctx.body = {
        type: 'success',
        code: 0,
        message: '文章新建成功！！！'
    }
})
router.get('/article',async(ctx)=>{
    let res = await Article.find().populate(['tag','category'])
    ctx.body = res
})
router.put('/article/:id',async(ctx)=>{
    const markdown = require('markdown').markdown
    ctx.request.body.html = markdown.toHTML(ctx.request.body.content)
    //更新文章
    const art = await Article.findByIdAndUpdate(ctx.params.id,ctx.request.body)
    //原来的分类 -1
    const category = await Category.findByIdAndUpdate(art.category,{$inc:{articlies:-1}})
    //判断原来的分类有没有上级分类
    if(category.parent){
        await Category.findByIdAndUpdate(category.parent,{$inc:{articlies:-1}})
    }
    //新的分类 +1
    const cate = await Category.findByIdAndUpdate(ctx.request.body.category,{$inc:{articlies:1}})
    if(cate.parent){
        await Category.findByIdAndUpdate(cate.parent,{$inc:{articlies:1}})
    }
    //原来的标签 -1
    art.tag.map(async(item)=>{
        await Tag.findByIdAndUpdate(item,{$inc:{articlies:-1}})
    })
    //新的标签 +1
    ctx.request.body.tag.map(async(item)=>{
        await Tag.findByIdAndUpdate(item,{$inc:{articlies:1}})
    })
    ctx.body = {
        code: 0,
        type: 'success',
        message: '修改成功！！！'
    }
})
router.get('/article/:id',async(ctx)=>{
    const article = await Article.findById(ctx.params.id)
    ctx.body = article
})
router.delete('/article/:id',async(ctx)=>{
    //删除文章
    const res = await Article.findByIdAndDelete(ctx.params.id)
    //分类articlies -1
    const cate = await Category.findByIdAndUpdate(res.category,{$inc:{articlies:-1}})
    //判断分类有没有上级分类
    if(cate.parent){
        //上级分类articlies -1
        await Category.findByIdAndUpdate(cate.parent,{$inc:{articlies:-1}})
    }
    //标签 -1
    res.tag.map(async(item)=>{
        await Tag.findByIdAndUpdate(item,{$inc:{articlies:-1}})
    })
    ctx.body = {
        code: 0,
        type: 'success',
        message: '删除成功！！！'
    }
})

//image upload
const upload = require('../../middleware/upload')
router.post('/upload',upload.single('file'),async(ctx)=>{ 
    ctx.body = {
        url: `http://localhost:3000/uploads/${ctx.req.file.filename}`
    }
})
router.delete('/upload/:id',async(ctx)=>{
    const path = require('path')
    const fs = require('fs')
    const url = path.join(__dirname,`../../public/uploads/${ctx.params.id}`)
    fs.unlinkSync(url)
    ctx.body = {
        code: 0,
        message: '删除成功！！！'
    }
})

//message
router.get('/message',async(ctx)=>{
    const res = await Message.find().sort({time:-1})
    ctx.body = res
})

router.delete('/message/:id',async(ctx)=>{
    const res = await Message.findByIdAndDelete(ctx.params.id)
    if(res){
        ctx.body = {
            code: 0,
            type: 'success',
            message: '删除成功！！！'
        }
    }else{
        ctx.body = {
            code: -1,
            type: 'error',
            message: '删除失败！！！'
        }
    }
})

router.put('/message/verify/:id',async(ctx)=>{
    const _res = await Message.findById(ctx.params.id)
    if(_res.verify === '已审核'){
        ctx.body = {
            code: 0,
            type: 'success',
            message: '该留言已通过审核！！！'
        }
    }else{
        await Message.findByIdAndUpdate(ctx.params.id,{$set:{verify:'已审核'}})
        ctx.body = {
            code: 0,
            type: 'success',
            message: '已通过审核！！！'
        }
    }
})

//comment
router.get('/comment',async(ctx)=>{
    const res = await Comment.find().populate('article')
    ctx.body = res
})
router.put('/comment/verify/:id',async(ctx)=>{
    const res = await Comment.findById(ctx.params.id)
    if(res.verify === '已审核'){
        ctx.body = {
            code: 0,
            type: 'success',
            message: '该评论已经审核通过了！！！'
        }
    }else{
        await Comment.findByIdAndUpdate(ctx.params.id,{$set:{verify:'已审核'}})
        await Article.findByIdAndUpdate(res.article,{$inc:{comments: 1}})
        ctx.body = {
            code: 0,
            type: 'success',
            message: '已通过审核！！！'
        }
    }
})
router.delete('/comment/:id',async(ctx)=>{
    const res = await Comment.findById(ctx.params.id)
    if(res.verify === '已审核'){
        await Article.findByIdAndUpdate(res.article,{$inc:{comments: -1}})
    }
    await Comment.findByIdAndDelete(ctx.params.id)
    ctx.body = {
        type: 'success',
        message: '评论删除成功！！！',
        code: 0
    }
})
module.exports = router