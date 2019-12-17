<template>
  <div class="add">
    <h1>新建分类</h1>
    <el-form @submit.native.prevent='save' label-width='120px'>
      <el-form-item label='所属分类'>
        <el-select v-model="model.parent" clearable placeholder="请选择">
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
    data(){
      return {
        model: {},
        parent:[]
      }
    },
    created(){
      this.fetchParent()
    },
    methods:{
      async save(){
        if(this.model.parent === ''){
          delete this.model.parent
        }
        let res = await this.$http.post('/category',this.model)
        this.$message({
          type: res.data.type,
          message: res.data.message
        })
        if(res.data.code === 0){
          this.$router.push('/categories/list')
        }
      },
      async fetchParent(){
        let _parent = await this.$http.get('/category/parent')
        this.parent = _parent.data
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