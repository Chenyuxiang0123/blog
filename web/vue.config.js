module.exports = {
  devServer: {
    port: 8000,     // 端口
  },
  lintOnSave: false,   // 取消 eslint 验证
  //publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  productionSourceMap: false,
};