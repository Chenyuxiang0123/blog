function formatTime(data){
  let time = new Date(data).toLocaleString();
  let status = time.split(' ')[1].includes('下午')
  let hour = time.split(' ')[1].split(':')[0]
  var _time,_hour;
  switch (hour) {
    case "下午1":
      _hour = '13'
      break;
    case "下午2":
      _hour = '14'
      break;
    case "下午3":
      _hour = '15'
      break;
    case "下午4":
      _hour = '16'
      break;
    case "下午5":
      _hour = '17'
      break;
    case "下午6":
      _hour = '18'
      break;
    case "下午7":
      _hour = '19'
      break;
    case "下午8":
      _hour = '20'
      break;
    case "下午9":
      _hour = '21'
      break;
    case "下午10":
      _hour = '22'
      break;
    case "下午11":
      _hour = '23'
      break;
    case "下午12":
      _hour = '12'
      break;
    default:
      break;
  }
  if(status){
    _time = time.split(' ')[0] + ' ' + time.split(' ')[1].replace(hour,_hour)
  }else{
    let currentTime = time.split(' ')[1].split(':')[0].replace('上午','')
    if(currentTime >= 10){
      _time = time.split(' ')[0] + ' ' + time.split(' ')[1].replace('上午','')
    }else{
      _time = time.split(' ')[0] + ' ' + time.split(' ')[1].replace('上午','0')
    }
  }
  return _time
}
export default formatTime
