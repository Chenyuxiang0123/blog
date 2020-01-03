<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <router-view />
    <el-footer>
      <my-footer /> 
    </el-footer>
  </el-container>
</template>

<script>
  import MyHeader from '../components/index/header'
  import MyFooter from '../components/index/footer'
  export default {
    data() {
      return {
        main:{}
      }
    },
    components: {
      MyHeader,
      MyFooter
    },
    created(){
      this.fetch()
    },
    methods:{
      async fetch(){
        const main = await this.$http.get('/main')
        this.main = main.data
        this.$store.commit('increment',this.main)
      }
    }
  }
</script>

<style lang='scss' scope>
  @import '../assets/css/base.scss';
  @import '../assets/css/common.scss';
  @import '../assets/css/main.scss';
</style>