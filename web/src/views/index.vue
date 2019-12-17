<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <router-view />
    </el-container>
    <el-footer>
      <my-footer /> 
    </el-footer>
  </el-container>
</template>

<script>
  import MyHeader from '../components/index/header'
  import MyFooter from '../components/index/footer'
  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style lang='scss' scope>
  @import '../assets/css/base.scss';
  @import '../assets/css/common.scss';
  @import '../assets/css/main.scss';
</style>