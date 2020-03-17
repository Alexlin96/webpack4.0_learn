// Loader和Plugin的区别理解
/*
  Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作
  Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

  Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性
  Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入
*/

// Webpack构建流程
/*
  初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
  开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
  确定入口：根据配置中的 entry 找出所有的入口文件
  编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
  完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
  输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
 
  在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
  */

  /* 简单版
  初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
  编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
  输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中
  */

// 打包原理
  /* 
    Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致
  */

// 热更新
  /*
    Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块
    HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。
  */

  // this指向代码
  let name = 'alex'

  let a = {
    name : 'jay',
    b : function() {
      console.log('name', this.name)
      return '666'
    },
    c: () => {
      console.log('C-name', this.name)
      return '666'
    },
    d: function() {
      (()=> {
        console.log('D-name', this.name)
        return '666'
      })()
    }
  }
  a.b() // 普通函数this指向调用者a 所以输出 jay
  a.c() // 箭头函数this指向上一层不是箭头函数的定义着所在的this 此时是全局 widow的this是undefined
  a.d() // 箭头函数其实是没有 this 的，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 this 此时是d函数 d函数this指向对象a

  let b = () => {
    console.log('name', this.name)
  }
  b()