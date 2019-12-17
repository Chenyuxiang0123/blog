<template>
  <el-row>
    <el-col :span='18'>
      <el-main>
        <router-view />
      </el-main>
    </el-col>
    <el-col :span='6'>
      <el-aside>
        <MyAside />
      </el-aside>
    </el-col>
  </el-row>
</template>
<script>
  import MyAside from './aside'
  export default {
    components:{
      MyAside
    }
  }
</script>