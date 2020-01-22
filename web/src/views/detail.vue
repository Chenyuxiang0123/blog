<template>
  <div class="articleWrap">
    <div class="article">
      <h1> {{ article.title }}</h1>
      <div class="articleInfo">
        <span class="itemTime">
          发表时间: {{ article.time | formatDate() }}
        </span>
        <span class="itemView">
          分类: {{ category.name }}
        </span>
        <span class="itemView">
          阅读: {{ article.views }}
        </span>
        <span class="itemView">
          评论人数: {{ article.comments }}
        </span>
        <span class="itemLike">
          点赞: {{ article.likes }}
        </span>
      </div>
      <mavon-editor :ishljs='true' :defaultOpen='"preview"' :toolbarsFlag='false' v-model="article.content"></mavon-editor>
      <p class="tabList">
        <i class="el-icon-price-tag" />标签:
        <router-link v-for="item in article.tag" :key="item._id" to="/tabs">{{ item.name }}</router-link>
      </p>
      <div class="praiseWrap">
        <el-button v-if="article.flag" @click="praise" type='primary'>赞一下!<span>({{article.likes}})</span></el-button>
        <el-button v-if="!article.flag" @click="praise" type='danger'>赞一下!<span>({{article.likes}})</span></el-button>
      </div>
      <ul class="list">
        <li>上一篇：
          <a v-if="pre" :href='`/detail/article/${pre.title}/${pre._id}`'>{{ pre.title}}</a>
          <span v-if="!pre">没有了...</span>
        </li>
        <li>下一篇：
          <a v-if="next" :href='`/detail/article/${next.title}/${next._id}`'>{{ next.title}}</a>
          <span v-if="!next">没有了...</span>
        </li>
      </ul>
    </div>
    <div class="messageEdit">
      <div class="warp">
        <span>发表评论</span>
        <p><em>*</em>提交评论之后不会马上显示,还需要通过后台审核</p>
        <i class="el-icon-picture-outline-round">表情</i>
        <el-form :model='comment' :rules='rules' ref='comment'>
          <el-form-item prop='content'>
            <el-input type='textarea' v-model="comment.content"></el-input>
          </el-form-item>
          <el-form-item label='昵称 :' prop='name'>
            <el-input v-model="comment.name"></el-input>
          </el-form-item>
          <el-form-item label='邮箱 :' prop='email'>
            <el-input v-model="comment.email"></el-input>
          </el-form-item>
          <el-form-item label='头像 :' prop='avatar'>
            <img v-for="(item,index) in avatar" :key="index" @click="avatarHandle"  class="avatar" :src="item.url" alt="avatar" ref='avatar'>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('comment')">提交评论</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="count">共有<span>{{ count }}</span>条评论关于 "{{ article.title}}"</p>
      <ul class="messageList">
        <li class="item" v-for="(item,index) in commentList" :key="index">
          <img :src="item.avatar"  alt="">
          <div class="detail">
            <p>
              <span>{{ item.name }}</span>
            </p>
            <p>{{ item.content }}</p>
            <p>{{ item.time | formatDate() }}</p>
          </div>
        </li>
      </ul>
      <div class="more" v-if='loading'>
        <el-button v-if="show" type="primary" @click="more">加载更多</el-button>
        <el-button v-if="!show" type="primary" :loading="true">加载更多</el-button>
      </div>
      <div class="more" v-if="noMore">
        <span>没有了...</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  export default {
    props:{
      id:{}
    },
    data() {
      return {
        flag: true,
        category: {},
        comment: {},
        article: {},
        pre: {},
        next: {},
        rules: {
          name:[
            {required:true,message:'请输入昵称',trigger:'blur'},
            {min:3,max:8,message:'长度在3到8个字符',trigger:'blur'}
          ],
          email:[
            {required:true,message:'请输入邮箱',trigger:'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger:'blur'}
          ],
          content:[
            {required:true,message:'请输入留言内容',tirgger:'blur'}
          ],
          avatar:[
            {required:true,message:'请选择头像'}
          ]
        },
        count: 0,
        commentList: [],
        list: [],
        show: true,
        avatar:[
          {url:require('../assets/avatar1.webp')},
          {url:require('../assets/avatar2.jpg')},
          {url:require('../assets/avatar3.jpg')},
          {url:require('../assets/avatar4.jpg')},
          {url:require('../assets/avatar5.jpg')},
          {url:require('../assets/avatar6.jpg')},
          {url:require('../assets/avatar7.jpg')},
          {url:require('../assets/avatar8.jpg')}
        ]
      }
    },
    components:{
      mavonEditor
    },
    created() {
      this.fetch()
    },
    computed: {
      noMore(){
        return this.commentList.length >= this.list.length
      },
      loading(){
        return this.commentList.length < this.list.length
      }
    },
    methods:{
      async fetch(){
        //获取文章
        const res = await this.$http.get(`/article/${this.id}`)
        this.article = res.data.res
        this.pre = res.data.pre
        this.next = res.data.next
        //获取文章的分类
        const _cate = await this.$http.get(`/category/${this.article.category._id}`)
        this.category = _cate.data.category
        //阅读量
        this.view()
        //获取文章评论
        const comments = await this.$http.get(`/comment/${this.article._id}`)
        this.list = comments.data.reverse()
        this.count = this.list.length
        this.commentList = this.list.slice(this.start,this.skip)
        //获取用户
        let user = await this.$http.get('/user')
        this.$set(this.comment,'name',user.data.name)
        this.$set(this.comment,'email',user.data.email)
        this.$set(this.comment,'avatar',user.data.avatar)
        let arr = this.$refs.avatar
        arr.forEach(item=>{
          if(item.src === user.data.avatar){
            this.flag = false
            item.style.borderColor = '#409EFF'
            item.style.opacity = '1'
          }
        })
      },
      //文章阅读+1
      async view(){
        let res = await this.$http.post(`/views/${this.article._id}`)
        if(res.data.code){
          this.article.views ++
        }
      },
      //点赞
      async praise(){
        const res = await this.$http.post(`/praise/${this.id}`)
        if(res.data.code){
          this.article.likes ++
          this.article.flag = !res.data.code
          this.$message({
            type: 'success',
            message: '点赞成功！！！'
          })
        }else{
          this.$message({
            type: 'warning',
            message: '已经点过赞了，欢迎明天再来！！！'
          })
        }
      },
      //提交评论
      submit(formName){
        this.$refs[formName].validate(async(valid) => {
          let user = await this.$http.get(`/user/${this.comment.name}`)
          if(user.data.code === -1){
            this.$message({
              type: user.data.type,
              message: user.data.message,
            })
          }
          if (valid && user.data.code === 0) {
            //发送请求
            this.comment.article = this.id
            const res = await this.$http.post('/comment',this.comment) 
            if(res.data.code === 0){
              this.$message({
                type: res.data.type,
                message: res.data.message
              })
              this.comment.content = ''
            }
          } else {
            return false;
          }
        })
      },
      //加载更多评论
      more(){
        this.start = this.start + 10
        this.skip = this.skip + 10
        this.show = false
        setTimeout(()=>{
          this.commentList = this.commentList.concat(this.list.slice(this.start,this.skip))
          this.show = true
        },1000)
      },
      avatarHandle(e){
        if(this.flag){
          this.avatarStyle()
          e.target.style.borderColor = '#409EFF'
          e.target.style.opacity = '1'
          this.$set(this.comment,'avatar',e.target.src)
        }
      },
      avatarStyle(){
        let arr = this.$refs.avatar
        arr.forEach(item=>{
          item.style.borderColor = 'transparent'
          item.style.opacity = '.8'
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  .article{
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    color: #666;
    h1{
      color: #000;
      text-align: center;
      font-size: 26px;
    }
    .articleInfo{
      padding: 10px 0;
      font-size: 15px;
      border-bottom: 1px solid #ccc;
      text-align: center;
      vertical-align: middle;
      span{
        margin-right: 10px;
      }
      span:last-child{
        margin-right: 0;
      }
    }
    .v-note-wrapper{
      display: block;
      z-index: inherit;
      .v-note-panel{
        display: block;
        .v-note-edit{
          display: none;
        }
        .v-note-show{
          width: auto;
          .v-show-content{
            pre{
              background-color: #282c34;
              color: #abb2bf;
              font-size: 18px;
              code{
                display: inline-block;
                width: 100%;
                background-color: #282c34;
                color: #abb2bf;
              }
              .hljs{
                background-color: #282c34;
                color: #abb2bf;
              }
            }
          }
        }
      }
    }
    .tabList{
      padding: 20px 0 10px;
      i{
        margin-right: 2px;
        transform: rotate(45deg);
      }
      a{
        margin-right: 10px;
      }
      a:last-child{
        margin-right: 0;
      }
    }
    .praiseWrap{
      text-align: center;
      .el-button--primary{
        background-color: #409eff;
        border-color: #409eff;
      }
      .el-button{
        border-radius: 5px;
        span{
          margin-left: 4px;
        }
      }
    }
    .list{
      margin-top: 10px;
      font-size: 15px;
      line-height: 24px;
      li{
        padding: 5px 0;
        a{
          display: inline;
          font-size: 15px;
          color: #666;
        }
        a:hover{
          color: #409eff;
        }
      }
    }
  }
  .messageEdit{
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    color: #666;
    .warp{
      padding: 10px;
      background-color: #f0f2f7;
      border-radius: 5px;
      font-size: 16px;
      i{
        display: block;
        margin: 10px 0;
        font-size:14px;
      }
      p{
        margin-top: 4px;
        font-size: 15px;
        em{
          margin-right: 5px;
          color: red;
        }
      }
      .el-form{
        .el-textarea__inner{
          height: 125px;
          outline: none;
          border: none;
        }
        .el-textarea__inner:focus{
          border-color: transparent;
        }
        .el-textarea__inner:hover{
          border-color: transparent;
        }
        .el-form-item:not(:first-child){
          display: inline-block;
          width: 50%;
          .el-input__inner:focus{
            border-color: #409EFF;
          }
          .el-form-item__content{
            display: inline-block;
            width: 78%;
          }
        }
        .el-form-item:last-child{
          width: 100%;
          text-align: center;
          .el-button--primary{
            width: 100px;
            background-color: #409EFF;
            line-height: 20px;
            border-radius: 20px;
            border: none;
            transition: .5s;
          }
          .el-button--primary:hover{
            width: 200px;
          }
        }
        .el-form-item:nth-last-child(2){
          width: 100%;
          input{
            display: none;
          }
          .el-form-item__content{
            width: 100%;
            .avatar{
              width: 60px;
              height: 60px;
              margin-right: 5px;
              opacity: .6;
              border: 1px solid transparent;
              border-radius: 50%;
              transition: .5s;
            }
          }
        }
      }
    }
    .count{
      padding: 10px;
      margin-top: 10px;
      background-color: #f0f2f7;
      text-align: center; 
    }
    .messageList{
      padding-bottom: 10px;
      li{
        position: relative;
        margin-top: 20px;
        padding-left: 90px;
        img{
          position: absolute;
          top: 5px;
          left: 50px;
          width: 60px;
          height: 60px;
        }
        .detail{
          padding: 10px 10px 10px 40px;
          background-color: #f0f2f7;
          p:first-child{
            font-size: 16px;
            font-weight: 600;
          }
          P:nth-child(2){
            padding: 10px 0;
            font-size: 15px;
          }
          p:last-child{
            font-size: 14px; 
          }
        }
      }
    }
    .more{
      padding: 10px 0;
      text-align: center;
      button{
        background-color: #409EFF;
        border: none;
      }
      span{
        font-size: 14px;
      }
    }
  }
</style>