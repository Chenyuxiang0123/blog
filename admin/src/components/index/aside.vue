<template>
  <el-aside width="200px" style="background-color: rgb(48, 65, 86)">
      <el-menu router :default-openeds="['2']">
        <el-menu-item index="/" active><i class="el-icon-s-home"></i>首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document" />文章管理</template>
          <el-menu-item index="/articlies/list">文章列表</el-menu-item>
          <el-menu-item index="/articlies/add">新增文章</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-s-promotion" />分类管理</template>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
          <el-menu-item index="/categories/add">新增分类</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-collection-tag" />标签管理</template>
          <el-menu-item index="/tag/list">标签列表</el-menu-item>
          <el-menu-item index="/tag/add">新增标签</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-user-solid" />用户管理</template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/add">新增用户</el-menu-item>
        </el-submenu>
        <el-menu-item index="/comment"><i class="el-icon-chat-line-square"></i>评论管理</el-menu-item>
        <el-menu-item index="/message"><i class="el-icon-tickets"></i>留言管理</el-menu-item>
        <el-menu-item index="/banner"><i class="el-icon-picture-outline"></i>轮播图</el-menu-item>
        <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
      </el-menu>
    </el-aside>
</template>