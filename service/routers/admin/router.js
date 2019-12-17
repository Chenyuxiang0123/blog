const Router = require('koa-router')
const router = new Router({
    prefix: '/admin/api'
})

const Category = require('../../models/Category')
const Tag = require('../../models/Tag')
const Article = require('../../models/Article')

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
    // 该分类有parent
    if(res.parent){
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
            //重新查找该分类
            const cate = await Category.findById(ctx.params.id).populate('parent')
            //保存新上级分类的childList
            const list = cate.parent.childList
            //childlist 为空 则直添加
            if(!list.length){
                await Category.findByIdAndUpdate(ctx.request.body.parent,{$push:{childList:cate}},{ multi: true })
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
    const list = await Category.find().populate(['parent'])
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
    //查找分类
    const res = await Category.findById(ctx.params.id).populate('parent')
    //判断该分类是否有上级分类
    if(res.parent){
        //从该上级分类中删除
        const f = await Category.findByIdAndUpdate({_id:res.parent._id},{$pull:{childList:{_id:res._id}}},{multi: true})
    }
    await Category.findByIdAndDelete(ctx.params.id)
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
router.put('tag/:id',async(ctx)=>{
    await Tag.findByIdAndUpdate({_id:ctx.params.id},ctx.request.body)
    ctx.body = {
        code: 0,
        message: '分类修改成功！！',
        type: 'success'
    }
})
router.delete('/tag/:id',async(ctx)=>{
    await Tag.findOneAndDelete(ctx.params.id)
    ctx.body = {
        code: 0,
        type: 'success',
        message: '删除成功！！！'
    }
})

//article
router.post('/article',async(ctx)=>{
    await Article.create(ctx.request.body)
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
    const res = await Article.findByIdAndUpdate(ctx.params.id,ctx.request.body)
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
    await Article.findByIdAndDelete(ctx.params.id)
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
module.exports = router