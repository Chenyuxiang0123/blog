<template>
  <div class="category">
    <h1>当前频道: <span>{{ $route.params.name }}</span></h1>
    <ul class="newList infinite-list" v-infinite-scroll="load">
      <li class="newItem infinite-list-item" v-for="(item,index) in articleList" :key='index'>
        <div class="itemDetail">
          <div class="detailImg">
            <img src="../assets/h2.jpg" alt="">
          </div>
          <div class="desc">
            <h3 class="itemTitle"><a href="/article">{{ item.title }}</a></h3>
            <p class="ellipsis3">{{ item.desc }}</p>
          </div>
        </div>
        <div class="itemInfo">
          <span class="itemLabel">
            <i class="el-icon-price-tag"></i>
            <a href="#">{{ item.label[0]}}</a>
          </span>
          <span class="itemTime">
            <i class="el-icon-timer"></i>
            {{ item.time.toLocaleDateString() }}
          </span>
          <span class="itemView">
            <i class="el-icon-view"></i>
            阅读({{ item.view }})
          </span>
          <span class="itemLike">
            <i class="el-icon-star-off"></i>
            喜欢({{ item.likes }})
          </span>
          <a class="readMore" href="#">阅读原文</a>
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
  export default {
    data(){
      return{
        list: [],
        articleList:[
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
          {
            title: '我的第一篇博客',
            time: new Date(),
            desc: `我的第一篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客我的第一
                      篇博客我的第一篇博客我的第一篇博客我的
                      第一篇博客我的第一篇博客我的第一篇博
                      客我的第一篇博客我的第一篇博客`,
            category: {
              name: 'JavaScript'
            },
            label:['JavaScript'],
            view:23,
            likes:53
          },
        ],
        activeName: 'second',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        pageCount:100,
        count: 0
      }
    },
    created() {
      this.fetch()
    },
    methods:{
      async fetch(){
        const res = await this.$http.get(`/category/${this.$route.params.id}`)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
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
  .category h1 span{
    margin-left: 10px;
  }
  .desc p{
    color: #666;
  }
  .block{
    text-align: center;
  }
</style>