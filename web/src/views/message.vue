<template>
  <el-main class="message">
    <div class="messageTitle border-radius-5px padding-left-right-10px">
      <h1>留言板</h1>
      <p>欢迎来到我的博客,欢迎给我留言！！</p>
    </div>
    <div class="messageEdit border-radius-5px padding-left-right-10px">
      <div class="warp border-radius-5px">
        <span>发表留言</span>
        <p><em>*</em>提交评论之后不会马上显示,还需要通过后台审核</p>
        <i class="el-icon-picture-outline-round">表情</i>
        <el-form :model='message' :rules='rules' ref='message'>
          <el-form-item prop='content'>
            <el-input type='textarea' v-model="message.content"></el-input>
          </el-form-item>
          <el-form-item label='昵称' prop='name'>
            <el-input v-model="message.name"></el-input>
          </el-form-item>
          <el-form-item label='邮箱' prop='email'>
            <el-input v-model="message.email"></el-input>
          </el-form-item>
          <el-form-item label='头像' prop='avatar'>
            <img v-for="(item,index) in avatar" :key="index" @click="avatarHandle"  class="avatar" :src="item.url" alt="avatar" ref='avatar'>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('message')">提交留言</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="count">共有<span>{{ this.list.length }}</span>条留言</p>
      <ul class="messageList" v-if="this.list.length">
        <li class="item" v-for="(item,index) in messageList" :key="index">
          <img :src="item.avatar"  alt="">
          <div class="detail">
            <p>
              <span>{{ item.name }}</span>
              <span>{{ index + 1 }}楼</span>
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
        <span>我是有底线的...</span>
      </div>
    </div>
  </el-main>
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
        message:{},
        rules:{
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
            {required:true,}
          ]
        },
        count:0,
        list:[],
        messageList:[],
        show: true,
        start:0,
        skip:10,
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
    created(){
      this.fetch()
    },
    computed: {
      noMore(){
        return this.messageList.length >= this.list.length
      },
      loading(){
        return this.messageList.length < this.list.length
      }
    },
    methods: {
      async fetch(){
        const res = await this.$http.get('/message')
        let user = await this.$http.get('/user')
        this.list = res.data
        this.count = this.list.length
        this.messageList = this.list.slice(this.start,this.skip)
        this.$set(this.message,'name',user.data.name)
        this.$set(this.message,'email',user.data.email)
        this.$set(this.message,'avatar',user.data.avatar)
        let arr = this.$refs.avatar
        arr.forEach(item=>{
          if(item.src === user.data.avatar){
            this.flag = false
            item.style.borderColor = '#409EFF'
            item.style.opacity = '1'
          }
        })
      },
      submit(formName){
        this.$refs[formName].validate(async (valid) => {
          let user = await this.$http.get(`/user/${this.message.name}`)
          if(user.data.code === -1){
            this.$message({
              type: user.data.type,
              message: user.data.message,
            })
          }
          if (valid && user.data.code === 0) {
            //发送请求
            const res = await this.$http.post('/message',this.message)
            if(res.data.code === 0){
              this.$message({
                type: res.data.type,
                message: res.data.message
              })
              this.message.content = ''
            }
          }
        })
      },
      more(){
        this.start = this.start + 10
        this.skip = this.skip + 10
        this.show = false
        setTimeout(()=>{
          this.messageList = this.messageList.concat(this.list.slice(this.start,this.skip))
          this.show = true
        },1000)
      },
      avatarHandle(e){
        if(this.flag){
          this.avatarStyle()
          e.target.style.borderColor = '#409EFF'
          e.target.style.opacity = '1'
          this.$set(this.message,'avatar',e.target.src)
        }
      },
      avatarStyle(){
        let arr = this.$refs.avatar
        arr.forEach(item=>{
          item.style.borderColor = 'transparent'
          item.style.opacity = '.8'
        })
      }
    },
  }
</script>

<style lang="scss" scope>
  .border-radius-5px{
    border-radius: 5px;
  }
  .padding-left-right-10px{
    padding: 0 10px;
  }
  .message{
    width: 85%;
    margin: 0 auto;
    .messageTitle{
      background-color: #fff;
      h1{
        position: relative;
        padding: 10px 0 5px 0;
        text-align: center;
        font-weight: 400;
        font-size: 20px;
      }
      h1::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 30px;
        height: 2px;
        margin: auto;
        background-color: #000;
      }
      p{
        padding: 20px 0;
        color: #666;
      }
    }
    .messageEdit{
      margin-top: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #fff;
      color: #666;
      .warp{
        padding: 10px;
        background-color: #f0f2f7;
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
          }
          .el-form-item__content{
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
              font-size: 15px;
              font-weight: 600;
              span:last-child{
                float: right;
                letter-spacing: 3px;
                font-size: 14px;
                font-weight: 400;
              }
            }
            P:nth-child(2){
              padding: 10px 0;
              font-size: 14px;
            }
            p:last-child{
              font-size: 13px; 
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
          font-size:14px;
        }
      }
    }
  }
</style>