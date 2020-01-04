//获取用户IP地址
const interfaces = require('os').networkInterfaces();
function getIp(){
  let IPAdress = '';
  for(var devName in interfaces){  
    var iface = interfaces[devName];  
    for(var i=0;i<iface.length;i++){  
      var alias = iface[i];  
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
        IPAdress = alias.address;  
      }  
    }  
  }
  return IPAdress
}
module.exports = getIp
