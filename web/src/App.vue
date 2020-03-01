<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import randomColor from './utils/randomColor'
  export default {
    provide(){
      return {
        setRandomColor(){
          let arr = this.$refs.category || []
          let list = this.$refs.icon || []
          arr.forEach((item,index)=>{
            let color = randomColor()
            item.style.backgroundColor = color
            list[index].style.color = color
          })
        }
      }
    }
  }
</script>