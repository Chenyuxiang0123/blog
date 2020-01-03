<template>
  <div class="wrap">
    <div class="top">
      <carousel />
      <ul class="top-right">
        <li class="right-item">
          <a href="#">
            <img src="../../assets/h1.jpg" alt="h1.jpg">
          </a>
        </li>
        <li class="right-item">
          <a href="#">
            <img src="../../assets/h2.jpg" alt="h2.jpg">
          </a>
        </li>
      </ul>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item,index) in tabs" :label="item.name" :name="index | order" :key='index'>
          <ul class="tab-left">
            <li v-for="list in item.left" :key='list._id'>
              <a :href="`/detail/article/${list.title}/${list._id}`">
                <img :src="list.imgUrl" :alt="list.title">
                <span>{{ list.content }}</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li v-for='(list,index) in item.right' :key='list._id'>
              <i>{{ index + 1 }}</i>
              <a :href="`/detail/article/${list.title}/${list._id}`" class="ellipsis1">{{ list.title }}</a>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="show title">
      <h2>案例展示</h2>
      <ul class="showList">
        <li class="listItem" v-for="item in cases" :key="item._id">
          <div class="imgWarp">
            <img :src="item.imgUrl" :alt="item.title">
          </div>
          <p class="itemTitle ellipsis1">{{ item.title }}</p>
          <p class="itemDesc ellipsis4">{{ item.content }}</p>
          <a class="readMe" :href="`/detail/article/${item.title}/${item._id}`">查看详情</a>
        </li>
      </ul>
    </div>
    <div class="new title">
      <h2>最新文章</h2>
      <ul class="newList">
        <li class="newItem" v-for="item in newList" :key='item._id'>
          <div class="itemDetail">
            <div class="detailImg">
              <img :src="item.imgUrl" :alt="item.title">
            </div>
            <div class="desc">
              <h3 class="itemTitle">
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
              <a href="/tabs" v-for="tag in item.tag" :key='tag._id'>{{ tag.name}}</a>
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
              喜欢({{ item.likes }})
            </span>
            <a class="readMore" :href="`/detail/article/${item.title}/${item._id}`">阅读原文</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="block">
      <el-button type='primary' @click="$router.push('/articlies/list')">所有文章</el-button>
    </div>
  </div>
</template>

<script>
  import Carousel from '../carousel/carousel'
  import {mapState} from 'vuex'
  export default {
    inject:['setRandomColor'],
    data(){
      return {
        activeName: '0',
      }
    },
    components: {
      Carousel
    },
    filters:{
      order(value){
        switch(value){
          case '0' :
            return 'first';
          case '1' :
            return 'second';
          case '2' :
            return 'third';
          case '3' :
            return 'fourth';
          case '4' :
            return 'fifth';
        }
      }
    },
    computed: {
      ...mapState({
        newList: 'newList',
        cases: 'cases',
        tabs: 'tabs'
      })
    },
    watch:{
      newList(){
        setTimeout(()=>{
          this.setRandomColor()
        })
      }
    }
  }
</script>
