import hl from 'highlight.js'
import 'highlight.js/styles/default.css'

let highlight = {}

//自定义插件
highlight.install = function (Vue){
  //自定义指令
  Vue.directive('highlight',{
    // 被绑定元素插入父节点时调用
    inserted(el){
      let blocks = el.querySelectorAll('pre code')
      for(let i = 0; i < blocks.length; i++){
        hl.highlightBlock(blocks[i])
      }
    },
    componentUpdated(el){
      let blocks = el.querySelectorAll('pre code')
      for(let i = 0; i < blocks.length; i++){
        hl.highlightBlock(blocks[i])
      }
    }
  })
}
export default highlight