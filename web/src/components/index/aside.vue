<template>
  <div>
    <div class="notice common">
      <h2 class="comTitle">
        <i class="el-icon-bell"></i>
        <span>公告:</span>
      </h2>
      <div class="info">
        <p>欢迎来到我的博客，来我博客的人都是最帅的~</p>
        <p>本人是个前端小白，目前在自学。如果你有什么好的建议或者学习方法，欢迎到留言区给我留言~大家共同进步！</p>
      </div>
    </div>
    <div class="topRank common">
      <h2 class="comTitle">
        <i class="el-icon-s-flag"></i>
        <span>热门排行:</span>
      </h2>
      <a class="showImg" :href="`/detail/article/${rankArt.title}/${rankArt._id}`">
        <img :src="rankArt.imgUrl" :alt="rankArt.title">
        <span class="ellipsis2">{{ rankArt.content }}</span>
      </a>
      <ul class="rankList">
        <li class="rankItem" v-for="(item,index) in rankList" :key="index">
          <a :href="`/detail/article/${item.title}/${item._id}`" :title="item.title">
            <i>{{ index + 1 }}</i>
            <span class="ellipsis1">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-if='rankList[7]' class="imgWrap">
      <a :href="`/detail/article/${rankList[7].title}/${rankList[7]._id}`" class="blogImg" title="图片">
        <img :src="rankList[7].imgUrl" :alt="rankList[7].title">
        <span class="ellipsis2">{{rankList[7].content}}</span>
      </a>
    </div>
    <div class="newComments common">
      <h2 class="comTitle">
        <i class="el-icon-s-opportunity"></i>
        <span>最新评论:</span>
      </h2>
      <a class="showImg" :href="`/detail/article/${commentArt.title}/${commentArt._id}`">
        <img :src="commentArt.imgUrl" :alt="commentArt.title">
        <span class="ellipsis2">{{ commentArt.content }}</span>
      </a>
      <ul class="info">
        <li class="info-item" v-for="item in comments" :key="item._id">
          <span style="background-color:red;">{{ item.avatar }}</span>
          <div class="right">
            <p class="author">{{ item.name }}</p>
            <p class="content">{{ item.content }}</p>
            <p class="article">
              <a href="#">评论于:{{ item.article.title }}</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="count common">
      <h2 class="comTitle">
        <i class="el-icon-s-data"></i>
        <span>站点统计:</span>
      </h2>
      <ul class="count-info">
        <li v-for="(item,index) in count" :key="index">
          {{ item.name }}: <span>{{ item.count | filterName(item.name) }}</span>
        </li>
      </ul>
    </div>
    <div class="label common">
      <h2 class="comTitle">
        <i class="el-icon-price-tag"></i>
        <span>标签云:</span>
        <a href="/tabs">更多</a>
      </h2>
      <ul class="list" ref="list">
        <li v-for="item in label" :key="item._id">
          <a href="/tabs">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    filters:{
      filterName(value,name){
        switch(name){
          case '文章': 
            return value + '篇'
          case '分类': 
            return value + '个'
          case '标签': 
            return value + '个'
          case '评论': 
            return value + '条'
          case '访问人数': 
            return value + '人'
        } 
      }
    },
    watch:{
      label(){
        setTimeout(()=>{
          this.setColor()
        })
      }
    },
    computed: {
      ...mapState({
        rankArt: 'rankArticle',
        rankList: 'rankList',
        commentArt: 'commentArt',
        comments: 'comments',
        count: 'count',
        label: 'tags'
      })
    },
    methods: {
      randomColor(){
        let r = parseInt(Math.random() * 255)
        let g = parseInt(Math.random() * 255)
        let b = parseInt(Math.random() * 255)
        let a = parseFloat(Math.random())
        return `rgba(${r},${g},${b},${a})`
      },
      setColor(){
          let list = this.$refs.list.children
          list.forEach(item=>{
            item.style.backgroundColor = this.randomColor() 
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  @import '../../assets/css/aside.scss';
</style>