<template>
  <div class="add">
    <h1>新建标签</h1>
    <el-form @submit.native.prevent='save' label-width='120px'>
      <el-form-item label='标签名称'>
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label='标签路由'>
        <el-input v-model='model.router' />
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        model: {},
        parent:[]
      }
    },
    methods:{
      async save(){
        let res = await this.$http.post('/tag',this.model)
        this.$message({
          type: res.data.type,
          message: res.data.message
        })
        if(res.data.code === 0){
          this.$router.push('/tag/list')
        }
      }
    }
  }
</script>

<style lang="scss" scope>
  h1{
    padding-bottom: 15px;
  }
  .el-input{
    padding: 10px 0;
  }
  .el-form-item__label{
    margin-top: 10px;
  }
</style>