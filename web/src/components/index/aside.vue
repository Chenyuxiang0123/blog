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
      <a class="showImg" href="#">
        <img src="../../assets/h1.jpg" alt="">
        <span class="ellipsis2">第三以偶片尾的第三以偶片尾的速度大声地我是第速度大声地我是第第三以偶片尾的速度大声地我是第</span>
      </a>
      <ul class="rankList">
        <li class="rankItem" v-for="(item,index) in rankList" :key="index">
          <a :href="item.href" :title="item.title">
            <i>{{ index + 1 }}</i>
            <span class="ellipsis1">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="imgWrap">
      <a href="#" class="blogImg" title="图片">
        <img src="../../assets/1.jpg" alt="图片">
      </a>
    </div>
    <div class="newComments common">
      <h2 class="comTitle">
        <i class="el-icon-s-opportunity"></i>
        <span>最新评论:</span>
      </h2>
      <a class="showImg" href="#">
        <img src="../../assets/h1.jpg" alt="">
        <span class="ellipsis2">第三以偶片尾的第三以偶片尾的速度大声地我是第速度大声地我是第第三以偶片尾的速度大声地我是第</span>
      </a>
      <ul class="info">
        <li class="info-item" v-for="item in comments" :key="item._id">
          <span :style="item.color">{{ item.avatar }}</span>
          <div class="right">
            <p class="author">{{ item.author }}</p>
            <p class="content">{{ item.content }}</p>
            <p class="article">
              <a href="#">评论于:{{ item.article }}</a>
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
          {{ item.name }}: <span>{{ item.amount }}</span>
        </li>
      </ul>
    </div>
    <div class="imgWrap">
      <a href="#" class="blogImg" title="图片">
        <img src="../../assets/2.jpg" alt="图片">
      </a>
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
  export default {
    data(){
      return {
        comments:[
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'gold'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'pink'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'yellow'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'green'}
          },
          {
            author: 'xiaoming',
            content: '我是最帅的人我是最帅的人我是最帅的人我是 ',
            article: '我的博客',
            time: new Date(),
            avatar: 'X',
            color: {backgroundColor: 'red'}
          }
        ],
        count:[
          {
            name: '文章',
            amount: '56篇'
          },
          {
            name: '分类',
            amount: '20个'
          },
          {
            name: '标签',
            amount: '100个'
          },
          {
            name: '评论',
            amount: '1000条'
          },
          {
            name: '访问人数',
            amount: '1200人'
          }
        ],
        label:[
          {name: 'CSS'},
          {name: 'JavaScript'},
          {name: 'CSS3'},
          {name: 'HTML'},
          {name: 'HTML5'},
          {name: '我的云标签是'},
          {name: 'Bootstrap'},
          {name: '我的云标签是'},
          {name: '我的云标签是'},
          {name: '我的云标签是'},
          {name: '我的云标签是'}
        ],
        rankList:[
          {
            title: "我是一篇文章的标题我是一篇文章的标题",
            href: '/category'
          },
          {
            title: "撒大声地梵蒂冈地方会很快就哭哭发的都是个人广东省电动蝶阀",
            href: '/category'
          },
          {
            title: "萨达是发生过任何非合同金额为粉丝大小便女淡粉色",
            href: '/category'
          },
          {
            title: "色股份大概会根据国家也尔水电费水电费第三方的方式",
            href: '/category'
          },
          {
            title: "双方都是粉粉粉色方式改革回复退回给饥饿时瑟瑟发抖深V地方",
            href: '/category'
          },
          {
            title: "是的粉色染色人防对方水电费杉杉股份",
            href: '/category'
          },
          {
            title: "是的粉色染色人防对方水电费杉杉股份",
            href: '/category'
          },
          {
            title: "讲话稿也问我第三单发的广泛地公认的好地方还给她",
            href: '/category'
          },
        ]
      }
    },
    mounted() {
      this.setColor()
    },
    methods: {
      randomColor(){
        let R = parseInt(Math.random() * 255);
        let G = parseInt(Math.random() * 255);
        let B = parseInt(Math.random() * 255);
        return `rgb(${R},${G},${B}`;

      },
      setColor(){
        let list = [...this.$refs.list.children];
        list.forEach((item)=>{
          item.style.backgroundColor = this.randomColor();
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  @import '../../assets/css/aside.scss';
</style>