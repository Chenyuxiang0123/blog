<template>
  <div class="category">
    <h1>当前频道: 
      <a href="/">首页</a>
      <a v-if="category.parent" :href="`${category.parent.router}/${category.parent._id}`">{{ category.parent.name }}</a>
      <span>{{ $route.params.name }}</span>
    </h1>
    <ul class="newList">
      <li class="newItem" v-for="item in articlies" :key='item._id'>
        <div class="itemDetail">
          <div class="detailImg">
            <img :src="item.imgUrl" :alt="item.title">
          </div>
          <div class="desc">
            <h3 class="itemTitle ellipsis1">
              <a :href="`/detail/article/${item.title}/${item._id}`">{{ item.title }}</a>
              <span class='category' ref='category'>
                <i class="el-icon-caret-left" ref="icon" />{{ item.category.name }}
              </span>
            </h3>
            <p class="ellipsis3">{{ item.content }}</p>
          </div>
        </div>
        <div class="itemInfo">
          <span class="itemLabel">
            <i class="el-icon-price-tag"></i>
            <a :href="tag.router" v-for="tag in item.tag" :key="tag._id">{{ tag.name }}</a>
          </span>
          <span class="itemTime">
            <i class="el-icon-timer"></i>
            {{ item.time | formatDate() }}
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
  export default {
    props: {
      id: {}
    },
    inject:['setRandomColor'],
    data(){
      return{
        category: {},
        articleList: [],
        articlies: [],
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
    watch:{
      articlies(){
        setTimeout(()=>{
          this.setRandomColor()
        })
      }
    },
    methods:{
      async fetch(){
        const res = await this.$http.get(`/category/${this.id}`)
        this.articleList = res.data.articleList
        this.category = res.data.category
        this.pageCount = this.category.articlies
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
        this.articlies = this.articleList.slice(page,skip)
      }
    }
  }
</script>

<style lang="scss" scope>
  .category{
    padding: 10px 10px 0;
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
    padding: 19px 0;
    text-align: center;
  }
</style>