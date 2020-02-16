<template>
  <div>
    <nav class="navbar">
      <h1><a href="/">我的博客</a></h1>
      <ul class="navList">
        <li v-for="(item) in list" :key='item._id'>
          <a v-if="item.name === '首页'" :href="item.router">{{ item.name  }}</a>
          <a v-if="item.name !== '首页'" :href="`${item.router}/${item._id}`">{{ item.name  }}</a>
          <i v-if="item.childList.length" class="el-icon-arrow-down"></i>
          <div class="navHide" v-if="item.childList.length">
              <a :href="`${value.router}/${value._id}`" v-for="value in item.childList"  :key='value._id'>{{ value.name }}</a>
          </div>
        </li>
      </ul>
      <div class="navSearch">
        <input v-model="value" type="text" placeholder="请输入关键字" autofocus="autofocus">
        <span @click="search">
          <i class="el-icon-search"></i>
        </span>
      </div>
    </nav>
    <nav class="smallNavbar">
      <el-row>
        <el-col :span="1">
          <i @click="drawer=true" class="el-icon-menu"></i>
          <el-drawer :direction='direction' :visible.sync="drawer" :with-header="false">
            <ul class="smallNavList">
              <li v-for="item in list" :key='item._id'>
                <a v-if="item.name === '首页'" :href="item.router">{{ item.name  }}</a>
                <a v-if="item.name !== '首页'" :href="`${item.router}/${item._id}`">{{ item.name  }}</a>
                <i v-if="item.childList.length" class="el-icon-arrow-down"></i>
                <div class="childList" v-if="item.childList.length">
                  <a :href="`${value.router}/${value._id}`" v-for="value in item.childList"  :key='value._id'>{{ value.name }}</a>
                </div>
              </li>
            </ul>
          </el-drawer>
        </el-col>
        <el-col :span="22">
          <h1><a href="/">我的博客</a></h1>
        </el-col>
        <el-col :span="1">
          <i @click="open" class="el-icon-search"></i>
        </el-col>
      </el-row>
      <div class="hideSearch" ref="hideSearch">
        <div class="search">
          <input v-model="value" type="text" placeholder="请输入搜索内容">
          <span @click="search">
            <i class="el-icon-search"></i>
          </span>
          <i @click="close" class="el-icon-close close"></i>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      drawer: false,
      direction: 'ltr'
    }
  },
  computed: {
    ...mapState({
      list: 'categories'
    })
  },
  methods: {
    search(){
      if(this.value === ''){
        this.$message({
          type: 'error',
          message: '请输入要搜索的内容'
        })
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      })
      setTimeout(()=>{
        loading.close()
        this.$router.push({path:'/search/detail',meta:{title:'搜索详情'},query:{value:this.value}})
      },2000)
    },
    close(){
      this.$refs.hideSearch.style.display = 'none'
    },
    open(){
      this.$refs.hideSearch.style.display = 'block'
    }
  },
}
</script>

<style lang='scss' scoped>
 @import '../../assets/css/header.scss'
</style>
