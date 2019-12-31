<template>
  <div class="category">
    <h1>当前频道: 
      <a href="/">首页</a>
      <a v-if="category.parent" :href="`${category.parent.router}/${category.parent.name}/${category.parent._id}`">{{ category.parent.name }}</a>
      <span>{{ $route.params.name }}</span>
    </h1>
    <ul class="newList">
      <li class="newItem" v-for="item in articlies" :key='item._id'>
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
            <a href="/tabs" v-for="tag in item.tag" :key="tag._id">{{ tag.name }}</a>
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
        :current-page="currentPage"
        :page-sizes="[15, 25, 35, 45]"
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
    props: {
      id: {}
    },
    data(){
      return{
        category: {},
        articlies: [],
        activeName: 'second',
        currentPage: 1,
        pageCount: 0,
        count: 0,
        page: 1,
        skip: 15
      }
    },
    created() {
      this.fetch()
    },
    methods:{
      async fetch(){
        const res = await this.$http.get(`/category/${this.id}`)
        res.data.articlies.map((item)=>{
          item.time = formatTime(item.time)
        })
        this.category = res.data
        this.pageCount = this.category.articlies.length
        this.paging()
      },
      handleSizeChange(val) {
        this.skip = val 
        this.page = 1
        this.paging()
      },
      handleCurrentChange(val) {
        this.page = val
        this.paging()
      },
      //分页
      paging(){
        let page = ( this.page - 1 ) * this.skip
        let skip = page + this.skip
        this.articlies = this.category.articlies.slice(page,skip)
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
    font-size: 16px;
  }
  .category h1 a::after{
    content: '/';
    margin-left: 6px;
  }
  .category h1 span{
    font-size: 16px;
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