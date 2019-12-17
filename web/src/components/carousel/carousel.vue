<template>
  <div class="block">
    <el-carousel height="260px" width="618px">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img :src="item.src" class="small" :alt="item.name">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "carousel",
    data(){
      return {
        list:[
          {
            src: require('../../assets/3.jpg'),
            name: '3.jpg'
          },
          {
            src: require('../../assets/4.jpg'),
            name: '4.jpg'
          },
          {
            src: require('../../assets/5.jpg'),
            name: '5.jpg'
          },
          {
            src: require('../../assets/6.jpg'),
            name: '6.jpg'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .block{
    width: 73%;
  }
  .el-carousel{
    border-radius: 5px;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
