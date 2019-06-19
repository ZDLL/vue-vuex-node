module.exports={
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // webpack-dev-server 相关配置
  devServer: {
      open: process.platform === 'darwin',
      host: '127.0.0.1',
      port: 8089,
      https: false,
      hotOnly: false,
      proxy: {
        '/api': {
                target: "http://127.0.0.1:8088/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
      }, // 设置代理
      before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
      // ...
  },
  lintOnSave: false//关闭严格

}
