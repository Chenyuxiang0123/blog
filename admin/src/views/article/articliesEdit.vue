<template>
  <div class="article">
    <h1>修改文章</h1>
    <el-form @submit.native.prevent='save' label-width='80px'>
      <el-form-item label='所属分类'>
        <el-select v-model="model.category" clearable placeholder="请选择">
          <el-option
            v-for="item in category"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='所属标签'>
        <el-select
          v-model="model.tag"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in tag"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='文章标题'>
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label='文章图片'>
        <div class="img" v-if="this.model.imgUrl">
          <div class="hide">
            <i class="el-icon-delete" @click="deleteImg"></i>
          </div>
          <img :src="model.imgUrl">
        </div>
        <div class="upload">
          <el-input type='file' @change="successImg" />
          <i class="el-icon-plus"></i>
        </div>
      </el-form-item>
      <el-form-item label='文章内容'>
        <mavon-editor 
        ref='md'
        v-model="model.content"
        :toolbars='toolbars'
        @imgAdd="handleImageAdded"
        @imgDel='handleRemove'/>
      </el-form-item>
      <el-form-item>
        <div class="localDocument">
          <input type='file' title="" @change="readFile" />
          <el-button type="primary">读取本地文档<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  export default {
    props:{
      id:{}
    },
    data(){
      return{
        model: {},
        category: [],
        tag: [],
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: false, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          navigation: false, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    created(){
      this.fetch()
    },
    components:{
      mavonEditor
    },
    methods:{
      async fetch(){
        let category = await this.$http.get('/category')
        let tag = await this.$http.get('/tag')
        let model = await this.$http.get(`/article/${this.id}`)
        this.category = category.data
        this.tag = tag.data
        this.model = model.data
      },
      async handleImageAdded(pos,file){
        const formData = new FormData()
        formData.append("file", file)
        const res = await this.$http.post('/upload',formData)
        this.$refs.md.$img2Url(pos,res.data.url)
      },
      async handleRemove(url) {
        const list = url[0].split('/') 
        const length = list.length
        const name = list[length -1]
        await this.$http.delete(`/upload/${name}`)
      },
      async successImg() {
        const formData = new FormData()
        const file = document.querySelector('input[type=file]').files[0]
        formData.append('file',file)
        const res = await this.$http.post('/upload',formData)
        this.$set(this.model,'imgUrl',res.data.url)
      },
      async deleteImg(){
        const list = this.model.imgUrl.split('/') 
        const length = list.length
        const name = list[length -1]
        const res = await this.$http.delete(`/upload/${name}`)
        if(res.data.code === 0 || res.data.code === -1){
          this.$set(this.model,'imgUrl','')
        }
      },
      async save(){
        const res = await this.$http.put(`/article/${this.id}`,this.model)
        if(res.status === 200 && res.data.code === 0){
          this.$message({
            type: res.data.type,
            message: res.data.message
          })
          this.$router.push('/articlies/list')
        }
      },
      readFile(e){
        const read = new FileReader()
        const file = e.target.files[0]
        const name = file.name.split('.')[0]
        read.readAsText(file,'utf-8')
        read.onload = (e)=>{
          this.$set(this.model,'title',name)
          this.$set(this.model,'content',e.target.result)
        }
      }
    }
  }
</script>

<style lang="scss" scope>
  @import '~mavon-editor/dist/css/index.css';
  h1{
    padding-bottom: 15px;
  }
  .img{
    position: relative;
    display: inline-block;
    width: 231px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid #ccc;
    vertical-align: middle;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .img .hide{
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    background-color: rgba(0,0,0,.6);
    text-align: center;
    line-height: 100px;
    transition: opacity .5s;
  }
  .img:hover .hide{
    opacity: 1;
  }
  .img .hide i{
    font-size: 18px;
    color: #fff;
  }
  .upload{
    display: inline-block;
    position: relative;
    width: 231px;
    height: 100px;
    border: 1px dashed #ccc;
    vertical-align: middle;
  }
  .upload:hover{
    border-color: #409EFF;
  }
  .upload .el-input__inner{
    width: 231px;
    height: 100px;
    padding: 0;
    border: none;
    opacity: 0;
  }
  .upload .el-icon-plus{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    margin: -12px 0 0 -12px; 
    font-size: 24px;
    color: #8ca0c6;
  }
  .localDocument{
    position: relative;
    display: inline-block;
    width: 145px;
    height: 40px;
    margin-right: 10px;
  }
  .localDocument>input[type=file]{
    position: absolute;
    display: block;
    opacity: 0;
    width: 145px;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 4px;
  }
</style>