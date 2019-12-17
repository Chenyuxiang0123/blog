<template>
  <div class="add">
    <h1>编辑分类</h1>
    <el-form @submit.native.prevent='save' label-width='120px'>
      <el-form-item label='所属分类'>
        <el-select v-model="model.parent" clearable placeholder="请选择" >
          <el-option
            v-for="item in parent"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='分类名称'>
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label='分类路由'>
        <el-input v-model="model.router" />
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
  export default {
    props:{
      id:{}
    },
    data(){
      return {
        model: {},
        parent:[]
      }
    },
    created(){
      this.fetchParent()
      this.fetch()
    },
    methods:{
      async save(){
        let res = await this.$http.put(`/category/${this.id}`,this.model)
        this.$message({
          type: res.data.type,
          message: res.data.message
        })
        if(res.data.code === 0){
          this.$router.push('/categories/list')
        }
      },
      async fetch(){
        let res = await this.$http.get(`/category/${this.id}`)
        this.model = res.data
        if(res.data.parent){
          this.model.parent = res.data.parent._id
        }
      },
      async fetchParent(){
        let res = await this.$http.get('/category/parent')
        this.parent = res.data
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