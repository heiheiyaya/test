sss如果使用的是create-react-app则可以参考本章方法，若是引入了antd，则需要使用Antd官方介绍的方法。亲测，在引入antd后，再使用修改webpack配置方法，引入less是无效的

1、首先显示create-react-app脚手架配置

npm run eject
2、找到项目下 config/webpack.config.js，在 file-loader 之前加入这部分代码

// less 开启模块化
{
  test: /\.less$/,
  exclude: /node_modules|\.module\.less$/,  // 排除 xxx.module.less 模块化文件
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'less-loader'
    }
  ]
},
{
  test: /\.module\.less$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]'
        }
      }
    },
    {
      loader: 'less-loader'
    }
  ]
},
3、下载less-loader依赖，版本过高则会报错，推荐此版本


npm install less-loader@6.0.0

作者：Poppy11
链接：https://www.jianshu.com/p/6bb111f3e3bc
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。