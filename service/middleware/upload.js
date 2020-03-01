const multer = require('koa-multer')
//配置文件
const storage = multer.diskStorage({
    //文件保存路径
    destination(req,file,cb){
        cb(null, 'public/uploads/')
    },
    //修改文件名
    filename(req,file,cb){
        const fileFormt = (file.originalname).split('.');
        cb(null,`${Date.now() + '.' + fileFormt[fileFormt.length - 1] }`)
    }
})
//加载配置
const upload = multer({storage})
module.exports = upload