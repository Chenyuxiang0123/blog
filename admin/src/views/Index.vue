<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <Aside />
    <el-container class="right">
      <Header />
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '../components/index/aside'
import Header from '../components/index/header'
export default {
  components: {
    Aside,
    Header
  }
}
</script>
<style lang="scss">
  .el-container .el-aside .el-menu{
    background-color: transparent;
  }
  .el-menu{
    border-right: none!important;
  }
  .el-menu>li{
    padding: 0;
  }
  .el-aside .el-menu li,
  .el-menu li div{
    color: #fff;
  }
  .el-menu li:hover,
  .el-menu li div:hover{
    color: rgb(48, 65, 86);
  }
  .el-menu-item.is-active {
    color: #409EFF!important;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>