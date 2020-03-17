//webpack.dev.js：是开发环境
const webpack = require("webpack");
const merge = require("webpack-merge"); //结合插件 提取公共配置，减少重复配置代码
const baseConfig = require("./webpack.base"); //公共配置

const devConfig = {
  // mode环境模式   development开发环境
  mode: "development",
  //devtool 决定源代码与打包后的代码之间的映射关系，方便对代码进行调试。
  //开发环境推荐: cheap-module-eval-source-map 生产环境推荐: cheap-module-source-map
  devtool: "cheap-module-eval-source-map", //cheap 不包含列的信息 module 可以定位其他第三方loader模块的错误  source-map生成新的map映射文件 eval 使用 eval 方式可大幅提高持续构建效率
  // plugins 插件 目的在于解决 loader 无法实现的其他事。
  plugins: [
    new webpack.HotModuleReplacementPlugin() //启用HMR  模块热替换
  ],
  devServer: {
    // 配置运行服务环境
    contentBase: "./dist",
    open: true, //自动打开浏览器
    hot: true, //启动webpack的模块热替换特性
    // hotOnly:true, // 在没有页面刷新的情况下启用热模块替换作为构建失败时的后备
    // port: 8080, //默认8080
    proxy: {
      "/api": {
        target: "http://localhost:8088",
        changeOrigin: true
      }
    }
  }
};

module.exports = merge(baseConfig, devConfig);
