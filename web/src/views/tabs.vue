<template>
  <el-main>
    <div class="tabs">
      <h1>标签云</h1>
      <ul class="tabList">
        <li class="item" v-for="item in tabs" :key="item._id" :style="item.color">
          <router-link tag="a" :to='item.router'>
            <span>{{ item.name }}</span>
            <span>(<i>{{ item.articlies.length }}</i>)</span>
          </router-link>
        </li>
      </ul>
    </div>
  </el-main>
</template>

<script>
  import randomColor from '../utils/randomColor'
  export default {
    data() {
      return {
        tabs:[]
      }
    },
    created() {
      this.fetch()
    },
    methods:{
      async fetch(){
        const res = await this.$http.get('/tabs')
        res.data.map((item)=>{
          item.color = randomColor()
          item.router = `${item.router}/${item.name}/${item._id}`
        })
        this.tabs = res.data
      }
    }
  }
</script>

<style lang="scss" scope>
  .tabs{
    width: 85%;
    height: 100vh;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5px;
    h1{
      position: relative;
      padding: 10px 0 10px 0;
      border-radius: 5px;
      text-align: center;
      font-weight: 400;
      font-size: 20px;
    }
    h1::after{
      content: '';
      position: absolute;
      bottom: 6px;
      left: 0;
      right: 0;
      width: 30px;
      height: 2px;
      margin: auto;
      background-color: #000;
    }
    .tabList{
      padding: 10px;
      .item{
        display: inline-block;
        margin-right: 10px;
        padding: 5px;
        border-radius: 5px;
        span:first-child{
          margin-right: 2px;
        }
      }
    }
  }
</style>