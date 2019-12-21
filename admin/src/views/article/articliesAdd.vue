
<template>
  <div class="article">
    <h1>新建文章</h1>
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
        <el-tabs type='border-card' v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="写文章" name="first">
            <vue-editor id="editor" v-model="model.content" useCustomImageHandler @image-added='handleImageAdded' @image-removed='handleRemove'> </vue-editor>
          </el-tab-pane>
          <el-tab-pane label="预览文章" name="second" v-html="model.content"></el-tab-pane>
        </el-tabs>
        
      </el-form-item>
      <el-form-item>
        <div class="localDocument">
          <input type='file' title=" " @change="readFile" />
          <el-button type="primary">读取本地文档<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor' 
  export default {
    data(){
      return{
        model: {},
        category: [],
        tag: [],
        activeName: 'first'
      }
    },
    created(){
      this.fetch()
    },
    components:{
      VueEditor
    },
    methods:{
      async fetch(){
        let category = await this.$http.get('/category')
        let tag = await this.$http.get('/tag')
        this.category = category.data
        this.tag = tag.data
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        const formData = new FormData()
        formData.append("file", file)
        const res = await this.$http.post('/upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url)
        resetUploader();
      },
      async handleRemove(file) {
        const list = file.split('/') 
        const length = list.length
        const name = list[length -1]
        await this.$http.delete(`/upload/${name}`)
      },
      async save(){
        const res = await this.$http.post('/article',this.model)
        if(res.status === 200 && res.data.code === 0){
          this.$message({
            type: res.data.type,
            message: res.data.message
          })
          this.$router.push('/articlies/list')
        }
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
        if(res.data.code === 0){
          this.$set(this.model,'imgUrl','')
        }
      },
      readFile(e){
        const read = new FileReader()
        const file = e.target.files[0]
        read.readAsText(file,'utf-8')
        read.onload = (e)=>{
          console.log(e.target.result)
          this.$set(this.model,'conent',e.target.result)
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scope>
  @import "~vue2-editor/dist/vue2-editor.css";
  @import '~quill/dist/quill.core.css';
  @import '~quill/dist/quill.bubble.css';
  @import '~quill/dist/quill.snow.css';

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
  .el-tabs__content{
    padding: 0!important;
  }
</style>