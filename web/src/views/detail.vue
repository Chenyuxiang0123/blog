<template>
  <div class="articleWrap">
    <div class="article">
      <h1> {{ article.title }}</h1>
      <div class="articleInfo">
        <span class="itemTime">
          发表时间: {{ article.time }}
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
      <el-button v-if="flag" @click="praise" type='primary'>赞一下!<span>({{article.likes}})</span></el-button>
      <el-button v-if="!flag" @click="praise" type='danger'>赞一下!<span>({{article.likes}})</span></el-button>
      <ul class="list">
        <li>上一篇：<router-link :to='`/article/${article.title}/${article._id}/detail`'>{{ article.title }}</router-link></li>
        <li>下一篇：<router-link :to='`/article/${article.title}/${article._id}/detail`'>{{ article.title }}</router-link></li>
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
          <el-form-item label='昵称' prop='name'>
            <el-input v-model="comment.name"></el-input>
          </el-form-item>
          <el-form-item label='邮箱' prop='email'>
            <el-input v-model="comment.email"></el-input>
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
            <p>{{ item.time }}</p>
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
  import formatTime from '../utils/FormatTime'
  import {mavonEditor} from 'mavon-editor'
  export default {
    props:{
      id:{}
    },
    data() {
      return {
        category: {},
        comment: {},
        flag: true,
        article: {},
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
          ]
        },
        count: 0,
        commentList: [],
        list: [],
        show: true,
        start:0,
        skip:10,
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
        res.data.time = formatTime(res.data.time)
        this.article = res.data
        //获取文章的分类
        const category = await this.$http.get(`/category/${res.data.category._id}`)
        this.category = category.data
        //阅读量
        this.article.views ++
        await this.$http.post(`/views/${this.article._id}`)
        //获取文章评论
        const comments = await this.$http.get(`/comment/${this.article._id}`)
        comments.data.map((item)=>{
          item.time = formatTime(item.time)
        })
        this.list = comments.data
        this.count = this.list.length
        this.commentList = this.list.slice(this.start,this.skip)
      },
      //点赞
      async praise(){
        if(this.flag){
          this.article.likes ++
          this.flag = false
          const res = await this.$http.post(`/praise/${this.id}`)
          if(res.data.code === 0){
            this.$message({
              type: 'success',
              message: '点赞成功！！！'
            })
          }
        }else{
          this.$message({
            type: 'warning',
            message: '已经点过赞了！！！'
          })
        }
      },
      //提交评论
      submit(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            //发送请求
            this.comment.article = this.id
            const res = await this.$http.post('/comment',this.comment) 
            if(res.data.code === 0){
              this.$message({
                type: res.data.type,
                message: res.data.message
              })
              this.comment = {}
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
              background-color: #000;
              color: #ccc;
              font-size: 18px;
              code{
                display: inline-block;
                width: 100%;
                background-color: #000;
                color: #ccc;
              }
              .hljs{
                background-color: #000;
                color: #ccc;
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
    .el-button--primary{
      background-color: #409eff;
      border-color: #409eff;
    }
    .el-button{
      display: inline-block;
      margin-left: 42%;
      border-radius: 5px;
      span{
        margin-left: 4px;
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
          margin-top: 20px;
          text-align: center;
          .el-button--primary{
            width: 200px;
            background-color: #409EFF;
            line-height: 20px;
            border-radius: 20px;
            border: none;
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