//获取用户IP地址
const interfaces = require('os').networkInterfaces();
function getIp(ctx){
  let ip = ctx.request.headers['X-Real-IP'] || ctx.request.headers['x-forwarded-for']
  if(ip){
    return ip
  }else{
    return '0.0.0.0'
  }
}
module.exports = getIp