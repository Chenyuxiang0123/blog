<template>
  <div>
    <h1>设置</h1>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="about管理">
        <el-form label-width='50px'>
          <el-form-item label='内容'>
            <el-input v-model="content">

            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="公告管理">公告管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top',
        content:''
      };
    }
  };
</script>

<style lang="scss" scope>
  .el-tabs{
    margin-top: 10px;
    box-shadow: 0 0 10px 0 #ccc;
    .el-tabs__header{
      padding-left: 5px;
    }
    .el-tabs__content{
      padding: 5px;
    }
  }
</style>