//webpack.base.js：是开发环境和生产环境都用到的配置
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    //多入口配置 当有多入口的时候，需要修改filename的属性值为'[name].js'
    //index:["@babel/polyfill", "./src/index.js"],
    index: "./src/index.js"
    // main:'./src/index.js',
  },
  // output 打包完成后文件输出位置配置
  output: {
    // filename 打包文件名字  如果不设置filename 则文件名字和入口文件路径的属性名一样
    filename: '[name][chunkhash:8].js', // chunk的hash值8位
    // path 设置打包完成文件输出路径
    path: path.resolve(__dirname, "../dist") //__dirname 当前文件所在的绝对路径
  },
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve(__dirname, "../src") // 这样配置后 @ 可以指向src目录
    }
  },
  // module 模块
  module: {
    rules: [
      //webpack 的配置中 loader 有两个目标：test和use
      //对文件进行打包
      {
        //test 用于标识出应该被对应的 loader 进行转换的某个或某些文件。
        test: /\.(png|jpg|gif)$/,
        //use 表示进行转换时，应该使用哪个 loader。
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]", // 对打包后的图片命名  ext拓展名 name文件名
            outputPath: "image/", // 打包后图片输出的位置   dist\images
            limit: 20480 // 1024 == 1kb  小于20kb时打包成base64编码的图片否则单独打包成图片
          }
        }
      },
      //对特殊文件字体文件进行打包 svg eot ttf
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        //use 表示进行转换时，应该使用哪个 loader。
        use: {
          loader: "file-loader"
        }
      },
      // 对JSON文件,csv,tvs和
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      // 对XML文件打包处理
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      // 对css和scss的打包
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true //加载css模块化打包，避免样式文件之间相互影响
            }
          },
          "postcss-loader" //加前缀 在项目根目录下配置postcss.config.js文件
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 有执行顺序的 顺序不能乱 从下至上 加载顺序是从后向前
          {
            loader: "style-loader" // 将字符串生成为style节点
          },
          {
            loader: "css-loader", // 将css转换为commonJS 模块
            options: {
              //importLoaders 用于配置css-loader作用于@import的资源之前有多少个loader先作用于@import的资源
              importLoaders: 2, // //0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              modules: true //加载css模块化打包，避免样式文件之间相互影响
            }
          },
          {
            loader: "sass-loader" // 将sass编译成css
          },
          "postcss-loader" //加前缀 在项目根目录下配置postcss.config.js文件
        ]
      },
      // babel-loader 转码
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // exclude: path.resolve(__dirname,'../node_modules'),   // loader 的排除范围(不明显)
        // include: path.resolve(__dirname,'../src'),  // loader的处理范围
        loader: "babel-loader"
      }
    ]
  },
  // plugins 插件 目的在于解决 loader 无法实现的其他事。
  plugins: [
    new htmlWebpackPlugin({
      //生成html文件
      template: "./index.html"
    }),
    new cleanWebpackPlugin() // 每次打包生成的dist目录，如果改一次代码，都得要删除一次dist目录，这样很麻烦，可以通过clean-webpack-plugin在每次打包的前自动清空dist目录。
  ],
  optimization: {
    // SplitChunksPlugin
    // splitChunks: {
    //   // 代码分割
    //   chunks: "all",
    //   //minSize: 8000, // 大于30kb才进行代码分割
    //   //maxSize: 10000, // 打包后的文件大小如果大于这个值,则进行二次打包
    //   // minChunks: 1, // 项目打包后的文件如果有多个文件导入的文件相同，且至少被引用几次，才会进行分割
    //   // maxAsyncRequests: 5, // 分离打包后若产生了5个文件，则之后的导入不再进行代码分割了
    //   // maxInitialRequests: 3, // 入口文件最多分割出三个包
    //   // automaticNameDelimiter: '~',
    //   name: true,
    //   // 分组打包 缓存组
    //   cacheGroups: {
    //     // 一条规则对应一个打包组,vendors和default分别是一个组,符合匹配规则的代码块会打包到同一个组里
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/, // 检测静态引入的依赖是否是这个目录下引入的,是则按这套规则打包
    //       priority: -10, // 打包时如果引入的代码块满足多个组的匹配条件,则根据优先级，打包到优先级更高的组里
    //       // filename: 'vendors.js' // 给打包文件取名,好像不起作用
    //       name: "myPack" // 自定义打包文件名
    //     },
    //     default: {
    //       // minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true // 复用已经被打包过的模块
    //     }
    //   }
    // },
    // performance: true, // 引入第三方库文件过大时编辑器控制台会报出黄色警告，这个配置可以关闭性能提示

    usedExports: true // 开启tree shaking
  }
};
