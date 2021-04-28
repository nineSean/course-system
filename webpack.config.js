const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  mode: isProd ? 'production' : 'development',
  // devtool: isProd ? 'source-map' : false,
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[fullhash:4].js',
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: {
      index: './index.html'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            ['import', {libraryName: 'antd', style: 'css'}]
          ]
        },
        include: path.resolve('src')
      }, {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 37.5,
              remPrecision: 8,
            },
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          }, {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader'
        ],
        exclude: /\.module\.less$/
      }, {
        test: /\.module\.less$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                compileType: 'module',
                localIdentName: '[name]_[local]_[hash:base64:6]',
                exportLocalsConvention: 'camelCase'
              }
            },
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          }, {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader'
        ]
      }, {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  stats: {
    errorDetails: true,
  },
}