//整体配置
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack=require('webpack')
module.exports = {
    // mode环境模式   development开发环境 product生成环境 
    mode:'development',
    //entry 入口文件配置
    entry:{  //多入口配置 当有多入口的时候，需要修改filename的属性值为'[name].js'
        index:'./src/index.js',
        // main:'./src/index.js',
    },
    // output 打包完成后文件输出位置配置
    output:{
        // filename 打包文件名字  如果不设置filename 则文件名字和入口文件路径的属性名一样
        filename:'[name].js',
        // path 设置打包完成文件输出路径
        path:path.resolve(__dirname,'dist'),   //__dirname 当前文件所在的绝对路径
    },
    // module 模块
    module:{
        rules:[  //webpack 的配置中 loader 有两个目标：test和use
            //对文件进行打包
            {
                //test 用于标识出应该被对应的 loader 进行转换的某个或某些文件。
                test: /\.(png|jpg|gif)$/,
                //use 表示进行转换时，应该使用哪个 loader。
                use:{
                    loader: 'url-loader',
                    options:{
                        name: '[name].[ext]', //对打包后的图片命名
                        outputPath:'image/',  //打包后图片输出的位置   dist\images
                        limit: 20480     // 1024 == 1kb  小于20kb时打包成base64编码的图片否则单独打包成图片 （图片文件越大，打包后base64的js就越大，加载一起就越大，所以base64适合小的图片）
                    }
                }
            },
            //对css和scss的打包 
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules: true,  //加载css模块化打包，避免样式文件之间相互影响
                        }
                    },
                    'postcss-loader', //加前缀 在项目根目录下配置postcss.config.js文件
                ]
            },
            {
                test:/\.scss$/,
                use:{
                    loader:'css-loader',
                    options:{
                        //importLoaders 用于配置css-loader作用于@import的资源之前有多少个loader先作用于@import的资源
                        importLoaders: 2,  //0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        modules: true //加载css模块化打包，避免样式文件之间相互影响
                    }
                }
            },
            // babel-loader 转码
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    // plugins 插件 目的在于解决 loader 无法实现的其他事。
    plugins:[
        new htmlWebpackPlugin({   //生成html文件
            template:'./index.html'
        }),
        new cleanWebpackPlugin(),   //每次打包生成的dist目录，如果改一次代码，都得要删除一次dist目录，这样很麻烦，可以通过clean-webpack-plugin在每次打包的前自动清空dist目录。
        new webpack.HotModuleReplacementPlugin() //启用HMR  模块热替换

    ],
    //devtool 决定源代码与打包后的代码之间的映射关系，方便对代码进行调试。
    devtool:'cheap-module-eval-source-map',
    //开发环境推荐: cheap-module-eval-source-map
    //生产环境推荐: cheap-module-source-map
    devServer:{    //配置运行服务环境
        contentBase: './dist',
        open: true, //自动打开浏览器
        hot: true,  //启动webpack的模块热替换特性
        hotOnly:true, // 在没有页面刷新的情况下启用热模块替换作为构建失败时的后备
        // port: 8080, //默认8080
    }
}