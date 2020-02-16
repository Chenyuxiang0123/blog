module.exports = app=>{
  const mongoose = require('mongoose')
  mongoose.set('useFindAndModify', false)
  mongoose.connect('mongodb://127.0.0.1:27017/blog',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },err=>{
    if(err){
      console.log('数据库连接失败！')
    }else{
      console.log('数据库连接成功！')
    }
  })
}