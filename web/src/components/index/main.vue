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
        <el-tab-pane label="前端工具" name="first">
          <ul class="tab-left">
            <li>
              <a href="#">
                <img src="../../assets/h1.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/h2.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li>
              <i>1</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>2</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>3</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>4</i>
              <a href="#" class="ellipsis1">大速度发代付电费奥术大师大</a>
            </li>
            <li>
              <i>5</i>
              <a href="#" class="ellipsis1">是我的啊是弄了的博客</a>
            </li>
            <li>
              <i>6</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="JavaScript" name="second">
          <ul class="tab-left">
            <li>
              <a href="#">
                <img src="../../assets/h1.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/h2.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li>
              <i>1</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>2</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>3</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>4</i>
              <a href="#" class="ellipsis1">大速度发代付电费奥术大师大</a>
            </li>
            <li>
              <i>5</i>
              <a href="#" class="ellipsis1">是我的啊是弄了的博客</a>
            </li>
            <li>
              <i>6</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="HTML & CSS" name="third">
          <ul class="tab-left">
            <li>
              <a href="#">
                <img src="../../assets/h1.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/h2.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li>
              <i>1</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>2</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>3</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>4</i>
              <a href="#" class="ellipsis1">大速度发代付电费奥术大师大</a>
            </li>
            <li>
              <i>5</i>
              <a href="#" class="ellipsis1">是我的啊是弄了的博客</a>
            </li>
            <li>
              <i>6</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Vue" name="fourth">
          <ul class="tab-left">
            <li>
              <a href="#">
                <img src="../../assets/h1.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/h2.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li>
              <i>1</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>2</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>3</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>4</i>
              <a href="#" class="ellipsis1">大速度发代付电费奥术大师大</a>
            </li>
            <li>
              <i>5</i>
              <a href="#" class="ellipsis1">是我的啊是弄了的博客</a>
            </li>
            <li>
              <i>6</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Less & Sass" name="fifth">
          <ul class="tab-left">
            <li>
              <a href="#">
                <img src="../../assets/h1.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/h2.jpg" alt="">
                <span>我是span我是span我是span我是span</span>
              </a>
            </li>
          </ul>
          <ul class="tab-right">
            <li>
              <i>1</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>2</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>3</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
            <li>
              <i>4</i>
              <a href="#" class="ellipsis1">大速度发代付电费奥术大师大</a>
            </li>
            <li>
              <i>5</i>
              <a href="#" class="ellipsis1">是我的啊是弄了的博客</a>
            </li>
            <li>
              <i>6</i>
              <a href="#" class="ellipsis1">是我的弄了的博客啊是</a>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="show title">
      <h2>案例展示</h2>
      <ul class="showList">
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
        <li class="listItem">
          <div class="imgWarp">
            <img src="../../assets/h1.jpg" alt="">
          </div>
          <p class="itemTitle ellipsis1">我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <p class="itemDesc">我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的我是一篇文章啊我司第三方撒地方都是的说法是的</p>
          <a class="readMe" href="#">查看详情</a>
        </li>
      </ul>
    </div>
    <div class="new title">
      <h2>最新文章</h2>
      <ul class="newList">
        <li class="newItem" v-for="(item,index) in newList" :key='index'>
          <div class="itemDetail">
            <div class="detailImg">
              <img src="../../assets/h2.jpg" alt="">
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
            <a class="readMore" href="/article/文章标题/文章Id/detial">阅读原文</a>
          </div>
        </li>
      </ul>
    </div>
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
  import Carousel from '../carousel/carousel'
  export default {
    data(){
      return {
        newList:[
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
        pageCount:100
      }
    },
    components: {
      Carousel
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    },
  }
</script>
