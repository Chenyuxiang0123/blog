<template>
  <div class="user">
    <h1>访客列表</h1>
    <el-table :data='users' stripe style="width:100%">
      <el-table-column prop='time' label='日期' width='150'></el-table-column>
      <el-table-column prop='_id' label='id' width='220'></el-table-column>
      <el-table-column prop='name' label='昵称' width='80'></el-table-column>
      <el-table-column prop='email' label='邮箱' width='180'></el-table-column>
      <el-table-column prop='ip' label='ip' width='180'></el-table-column>
      <el-table-column prop='avatar' label='头像' width='220'>
        <template slot-scope="scope">
          <img width="30" height="30" :src="scope.row.avatar" alt="头像">
        </template>
      </el-table-column>
      <el-table-column label='操作'>
        <template slot-scope="scope">
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
  import formatTime from '../../utils/FormatTime'
  export default {
    data() {
      return {
        users:[]
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      async fetch(){
        let res = await this.$http.get('/user')
        res.data.map(item =>{
          item.time = formatTime(item.time)
        })
        this.users = res.data
      },
      async handleDelete(row){
        let res = await this.$http.delete(`/user/${row._id}`)
        if(res.data.code === 0){
          this.$message({
            type: res.data.type,
            message: res.data.message
          })
        }
      }
    },
  }
</script>