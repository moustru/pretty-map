const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');
const argv = require('yargs').argv;
const isDev = argv.mode === 'development';
const isProd = !isDev;

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/app.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },

      { 
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              publicPath: './dist/css',
              url: false,
              minimize: true
            }
          },

          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                isProd ? cssnano : () => {},
                autoprefixer({
                  browsers: ['ie >=11', 'last 4 versions']
                })
              ]
            }
          },
          'sass-loader'
        ]
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/images/[name].[ext]'
            }
          },

          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              }
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
      chunkFilename: 'css/[id].css'
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    host: 'localhost',
    port: 9000,
    compress: true,
    open: true,
    hot: true
  }
};