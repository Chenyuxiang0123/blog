<template>
  <div class="list">
    <h1>留言列表</h1>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="time" label="日期"></el-table-column>
      <el-table-column prop="_id" label="id" width='220'></el-table-column>
      <el-table-column prop="name" label="留言人" width='120'></el-table-column>
      <el-table-column prop="email" label="邮箱" width='170'></el-table-column>
      <el-table-column prop="verify" label="状态"></el-table-column>
      <el-table-column label="操作" width='220'>
        <template slot-scope="scope">
          <el-button size='mini' @click="handleWatch(scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-dialog title="留言内容" :visible.sync="outerVisible">
            <div>{{row.content}}</div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="danger" @click="innerVisible = true">审核</el-button>
            </div>
            <el-dialog
              width="30%"
              :visible.sync="innerVisible"
              append-to-body>
              <div>是否通过审核</div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="danger" @click="handleVerify(row)">确定</el-button>
              </div>
            </el-dialog>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import formatTime from '../utils/FormatTime'
  export default {
    data() {
      return {
        list: [],
        outerVisible: false,
        innerVisible: false,
        row: {}
      }
    },
    created(){
      this.fetch()
    },
    methods:{
      async fetch(){
        const res = await this.$http.get('/message')
        res.data.map((item)=>{
          item.time = formatTime(item.time)
        })
        this.list = res.data
      },
      async handleDelete(row){
        const res = await this.$http.delete(`/message/${row._id}`)
        if(res.data.code === 0){
          this.$message({
            type:res.data.type,
            message: res.data.message
          })
          this.fetch()
        }
      },
      handleWatch(row){
        this.outerVisible = true
        this.row = row
      },
      async handleVerify(row){
        const res = await this.$http.put(`/message/verify/${row._id}`)
        if(res.data.code === 0){
          this.$message({
            type: res.data.type,
            message: res.data.message
          })
          this.fetch()
          this.outerVisible = false
          this.innerVisible = false
        }
      }
    }
  }
</script>