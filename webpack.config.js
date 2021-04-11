const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const assetsCDN = {
  css: [],
  js: {
    vue: 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    axios: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  }
}

module.exports = env => {
  const IS_PROD = ['production'].includes(env.NODE_ENV)
  const babelPlugins = ['@babel/plugin-proposal-class-properties']
  const plugins = [
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
      cache: true,
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
      cache: true,
      template: 'src/page2/index.html', // 配置文件模板
      filename: 'page2.html',
      chunks: ['page2'],
      cdn: {
        css: [],
        js: [
          assetsCDN.js.vue,
          assetsCDN.js.axios
        ]
      }
    }),
  ]
  if (IS_PROD) {
    babelPlugins.push('transform-remove-console')
    babelPlugins.push('@babel/plugin-transform-runtime')
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  return {
    mode: 'development', // 指定构建模式
    externals: {
      'Vue': 'Vue',
      'axios': 'axios'
    },
    entry: { // 指定构建入口文件
      common: `./src/js/common.js`,
      page1: `./src/page1/page1.js`,
      page2: `./src/page2/page2.js`
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
      filename: 'js/[name].[contenthash].js', // 指定构建生成的文件名
      libraryTarget: 'umd',
      clean: true,
      environment: {
        // The environment supports arrow functions ('() => { ... }').
        arrowFunction: false,
        // The environment supports BigInt as literal (123n).
        bigIntLiteral: false,
        // The environment supports const and let for variable declarations.
        const: false,
        // The environment supports destructuring ('{ a, b } = obj').
        destructuring: false,
        // The environment supports an async import() function to import EcmaScript modules.
        dynamicImport: false,
        // The environment supports 'for of' iteration ('for (const x of array) { ... }').
        forOf: false,
        // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        module: false
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      hot: true,
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
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // 其他选项
                      },
                    ],
                  ],
                },
              }
            }
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
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // 其他选项
                      },
                    ],
                  ],
                },
              }
            }
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'thread-loader',
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      'useBuiltIns': 'entry',
                      'corejs': {
                        'version': 3,
                        'proposals': true,
                      },
                      'targets': '> 1%, last 2 versions, not ie <= 10'
                    }
                  ]
                ],
                plugins: babelPlugins
              }
            }
          ]
        },
      ],
    },
    plugins: plugins,
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          moduleMain: {
            chunks: 'all',
            test: path.resolve(__dirname, 'src/js/main.js'),
            name: 'main',
            filename: 'js/common/[name].[contenthash].bundle.js',
            enforce: true
          },
          componentAlert: {
            test: path.resolve(__dirname, 'src/components/alert'),
            name: 'componentAlert',
            filename: 'js/common/[name].[contenthash].bundle.js',
            enforce: true
          }
        }
      }
    }
  }
}