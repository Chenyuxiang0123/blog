<template>
  <div class="category">
    <h1>当前频道: 
      <a href="/">首页</a>
      <a href="/tabs">标签云</a>
      <span>{{ $route.params.title }}</span>
    </h1>
    <ul class="newList">
      <li class="newItem" v-for="item in articleList" :key='item._id'>
        <div class="itemDetail">
          <div class="detailImg">
            <img :src="item.imgUrl" :alt="item.title">
          </div>
          <div class="desc">
            <h3 class="itemTitle"><a href="/article">{{ item.title }}</a></h3>
            <p class="ellipsis3">{{ item.content }}</p>
          </div>
        </div>
        <div class="itemInfo">
          <span class="itemLabel">
            <i class="el-icon-price-tag"></i>
            <a href="#" v-for="tag in item.tag" :key="tag._id">{{ tag.name }}</a>
          </span>
          <span class="itemTime">
            <i class="el-icon-timer"></i>
            {{ item.time }}
          </span>
          <span class="itemView">
            <i class="el-icon-view"></i>
            阅读({{ item.views }})
          </span>
          <span class="itemLike">
            <i class="el-icon-star-off"></i>
            点赞({{ item.likes }})
          </span>
          <a class="readMore" :href='`/detail/article/${item.title}/${item._id}`'>阅读原文</a>
        </div>
      </li>
    </ul>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="prev, pager, next, jumper,sizes, total"
        :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import formatTime from '../utils/FormatTime'
  export default {
    data(){
      return{
        tab: {},
        articleList:[],
        activeName: 'second',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        pageCount:100,
        count: 0,
      }
    },
    created() {
      this.fetch()
    },
    methods:{
      async fetch(){
        const res = await this.$http.get(`/tabs/${this.$route.params.id}`)
        
        this.tab = res.data
        let arr = [...this.tab.articlies]
        arr.map(async(item)=>{
          item.time = formatTime(item.time)
          let arrTag = [...item.tag]
          item.tag = []
          arrTag.map(async(value)=>{
            const _res = await this.$http.get(`/tabs/${value}`)
            item.tag.push(_res.data)
          })
        })
        this.articleList = arr
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
         //console.log(`当前页: ${val}`);
      },
      load () {
        this.count += 2
      }
    }
  }
</script>

<style lang="scss" scope>
  .category{
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    color: #666;
  }
  .category h1{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 17px;
    font-weight: 400;
  }
  .category h1 a{
    margin-right: 6px;
  }
  .category h1 a::after{
    content: '/';
    margin-left: 6px;
  }
  .desc p{
    color: #666;
  }
  .itemLabel a{
    margin-right: 5px;
  }
  .itemLabel a:last-child{
    margin-right: 0;
  }
  .block{
    text-align: center;
  }
</style>