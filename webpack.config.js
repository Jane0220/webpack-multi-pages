const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const assetsCDN = {
  css: [],
  js: {
    vue: '//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    axios: '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  }
}

module.exports = env => {
  const IS_PROD = ['production'].includes(env.NODE_ENV)
  const babelPlugins = []
  if (IS_PROD) {
    babelPlugins.push('transform-remove-console')
  }
  return {
    mode: 'development', // 指定构建模式
    entry: { // 指定构建入口文件
      common: `./src/js/common.js`,
      page1: `./src/page1/page1.js`,
      page2: [
        `./src/js/common.js`,
        `./src/page2/page2.js`
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
      filename: 'js/[name].[contenthash].js', // 指定构建生成的文件名
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      open: true,
      port: 9000,
      proxy: {
        "/api": {
          target: "https://www.baidu.com",
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            "^/api" : ""
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.css/i,
          use: [
            // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.less$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader",
            {
              loader: "less-loader",
              options: {
                additionalData: `@env: ${env.NODE_ENV};`,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'useBuiltIns': 'entry',
                    'targets': '> 1%, last 2 versions, not ie <= 10'
                  }
                ]
              ],
              plugins: babelPlugins
            }
          }
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/images', to: 'images' },
          { from: 'src/scripts', to: 'scripts' }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css' // 这里也可以使用 [hash]
      }),
      new HtmlWebpackPlugin({
        title: 'page1',
        template: 'src/page1/index.html', // 配置文件模板
        filename: 'page1.html',
        chunks: ['common', 'page1'],
        cdn: {
          css: [],
          js: [
            assetsCDN.js.vue,
            assetsCDN.js.axios
          ]
        }
      }),
      new HtmlWebpackPlugin({
        title: 'page2',
        template: 'src/page2/index.html', // 配置文件模板
        filename: 'page2.html',
        chunks: ['page2', 'commonCss'],
        cdn: {
          css: [],
          js: [
            assetsCDN.js.vue,
            assetsCDN.js.axios
          ]
        }
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin()
      ],
    }
  }
}