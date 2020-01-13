<template>
  <div class="block">
    <el-carousel height="260px" width="618px">
      <el-carousel-item v-for="item in list" :key="item._id">
        <a :href="`/detail/article/${item.title}/${item._id}`">
          <img :src="item.imgUrl" class="small" :alt="item.title">  
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: "carousel",
    computed: {
      ...mapState({
        list: 'newList'
      })
    },
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
