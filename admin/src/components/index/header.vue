<template>
  <el-header>
		<el-row>
			<el-col :span='20'>
				<i class="el-icon-s-fold"/>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-col :span='4'>
				<el-dropdown>
					<img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="头像">
					<i class="el-icon-caret-bottom" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人信息</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</el-header>
</template>

<script>
	export default {

	}
</script>

<style lang='scss' scope>
	.right{
		flex-direction:column!important;
	}
	.el-header{
		border-bottom: 2px solid #ccc;
	}
	.el-row .el-col{
		line-height: 60px;
		font-size: 25px;
	}
	.el-col-20 .el-breadcrumb{
		display: inline-block;
		margin-left: 10px;
		font-size: 14px;
	}
	.el-breadcrumb .el-breadcrumb__item .is-link{
		font-weight: 400;
	}
	.el-col-4{
		height: 60px;
		text-align: right;
	}
	.el-col-4 .el-dropdown{
		margin-top: 9px;
		line-height: 0;
	}
	
	.el-col-4 .el-dropdown img{
		width: 40px;
		height: 40px;
		margin-right: 10px;
		cursor: pointer;
		user-select: none; 
		border-radius: 10px;
	}
</style>