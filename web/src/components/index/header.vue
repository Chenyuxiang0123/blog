<template>
  <nav class="navbar">
    <h1><a href="/">我的博客</a></h1>
    <ul class="navList">
      <li v-for="(item,index) in list" :key='index'>
        <a :href="`${item.router}/${item.name}/${item._id}`">{{ item.name  }}</a>
        <i v-if="item.childList.length" class="el-icon-arrow-down"></i>
        <div class="navHide" v-if="item.childList.length">
            <a :href="`${value.router}/${value.name}/${value._id}`" v-for="(value,idx) in item.childList"  :key='idx'>{{ value.name }}</a>
        </div>
      </li>
    </ul>
    <div class="navSearch">
      <input type="text" placeholder="请输入关键字" autofocus="autofocus">
      <span>
        <i class="el-icon-search"></i>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      list:[]
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch(){
      let list = await this.$http.get('/category')
      this.list = list.data
    }
  },
}
</script>

<style scoped>
  .navbar{
    display: flex;
    width: 85%;
    padding: 10px;
    margin: 0 auto;
  }
  .navbar h1{
    flex: 1;
    font-size: 22px;
    font-weight: 300;
  }
  .navbar .navList{
    flex: 6;
  }
  .navbar .navList li{
    position: relative;
    display: inline-block;
    margin-left: 20px;
    line-height: 31px;
  }
  .navList li:hover .navHide{
     display: block;
   }
  .navList li>a:hover{
    color: #409EFF;
  }
  .navList li i{
    color: #666;
  }
  .navHide{
    display: none;
    position: absolute;
    left: 50%;
    z-index: 999;
    width: 130px;
    margin-left: -65px;
    background-color: rgba( 255,255,255,0.7);
    border: 1px solid #eee;
  }
  .navHide a{
    display: block;
    padding: 5px;
    transition: .5s;
  }
  .navHide>a:hover{
    background-color: #409EFF;
    color: white;
    transform: scale(1.1);
  }
  .navHide a:last-child{
    border-bottom: none;
  }
  .navbar .navSearch{
    flex: 2;
    font-size: 0;
    text-align: right;
  }
  .navSearch input{
    display: inline-block;
    max-width: 171px;
    width: 80%;
    line-height: 30px;
    border: 1px solid #EEE;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    vertical-align: middle;
  }
  input[placeholder]{
    color: #666;
    text-indent: 4px;
  }
  .navSearch span{
    display: inline-block;
    width: 32px;
    background-color: #ccc;
    text-align: center;
    line-height: 32px;
    vertical-align: middle;
    font-size: 18px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
