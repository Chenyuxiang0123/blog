<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="list" stripe style="width: 100%" lazy>
      <el-table-column prop="time" label="日期" width="200"></el-table-column>
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="130"></el-table-column>
      <el-table-column prop="parent.name" label="所属分类" width="100"></el-table-column>
      <el-table-column prop="router" label="分类路由" width="100"></el-table-column>
      <el-table-column prop="childList.length" label="子分类个数" width="90"></el-table-column>
      <el-table-column prop="articlies" label="文章数量" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import FormatTime from '../../utils/FormatTime'
  
  export default {
    data(){
      return {
        list:[]
      }
    },
    created(){
      this.fetch()
    },
    methods:{
      async fetch(){
        let list = await this.$http.get('/category')
        list.data.map((item)=>{
          let data = item.time
          item.time = FormatTime(data)
        })
        this.list = list.data
      },
      handleDelete(row) {
        this.$confirm(`是否删除分类 '${row.name}'`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$http.delete(`/category/${row._id}`)
          this.$message({
            type: res.data.type,
            message: res.data.message
          })
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      }
    }
  }
</script>