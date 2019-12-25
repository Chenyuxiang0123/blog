<template>
  <el-main class="message">
    <div class="messageTitle border-radius-5px padding-left-right-10px">
      <h1>留言板</h1>
      <p>欢迎来到我的博客,欢迎给我留言！！</p>
    </div>
    <div class="messageEdit border-radius-5px padding-left-right-10px">
      <div class="warp border-radius-5px">
        <span>发表留言</span>
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
          <el-form-item>
            <el-button type="primary" @click="submit('message')">提交留言</el-button>
          </el-form-item>
        </el-form>
      </div>
      <ul class="messageList">
        <li class="item" v-for="(item,index) in messageList" :key="index">
          <img :src="item.avatar"  alt="">
          <div class="detail">
            <p>
              <span>{{ item.name }}</span>
              <span>{{ index + 1 }}楼</span>
            </p>
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
          </div>
        </li>
      </ul>
      <div class="more">
        <el-button v-if="show" type="primary" @click="more">加载更多</el-button>
        <el-button v-if="!show" type="primary" :loading="true">加载更多</el-button>
      </div>
    </div>
  </el-main>
</template>
<script>
  export default {
    data() {
      return {
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
          ]
        },
        messageList:[
          {
            avatar:require('../assets/logo.png'),
            name: '风对对对',
            content: '分公司你看得见萨芬喝咖啡和覅额武汉以二娃艰苦奋斗时间啊发动机看过很多块几十个很快就符合公司了客户方锐安环境看到回复啡和覅额武汉以二娃艰苦奋斗时间啊发动机看过很多块几十个很快就符合公司了客户方锐安环境看到回复',
            time:'2019-12-25  14:52:36'
          }
        ],
        show: true
      }
    },
    methods: {
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
          } else {
            return false;
          }
        })
      },
      more(){
        this.show = false
        setTimeout(()=>{
          let list = Array(9).fill(this.messageList[0])
          this.messageList = this.messageList.concat(list)
          this.show = true
        },2000)
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
        };
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
              span:last-child{
                float: right;
                letter-spacing: 3px;
                font-size: 15px;
                font-weight: 400;
              }
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
      }
    }
  }
</style>