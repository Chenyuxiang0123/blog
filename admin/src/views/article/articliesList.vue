<template>
  <div class="list">
    <h1>文章列表</h1>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="time" label="日期"></el-table-column>
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column prop="category.name" label="所属分类" width="150"></el-table-column>
      <el-table-column prop="views" label="阅读量" width="100"></el-table-column>
      <el-table-column prop="likes" label="点赞数" width="100"></el-table-column>
      <el-table-column prop="comments" label="评论人数" width="100"></el-table-column>
      <el-table-column label="标签个数">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span style="margin-right:5px;" v-for="item in scope.row.tag" :key="item._id">{{ item.name }}</span>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.tag.length }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$router.push(`/articlies/edit/${scope.row._id}`)">编辑</el-button>
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
        list:[]
      };
    },
    created(){
      this.fetch()
    },
    methods: {
      async fetch(){
        const res = await this.$http.get('/article')
        res.data.map((item)=>{
          item.time = formatTime(item.time)
        })
        this.list = res.data
      },
      handleDelete(row) {
        this.$confirm(`是否删除文章 '${row.title}'`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$http.delete(`/article/${row._id}`)
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
