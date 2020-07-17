const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'HW/'),
  entry: {
    home: './scripts/home/main.js',
    blog: './scripts/blog/main.js',
    posts: './scripts/posts/main.js',
    postForm: './scripts/addPostForm.js',
    authorsPage: './scripts/authorsPage.js',
  },
  output: {
    filename: './scripts/[name].js',
    path: path.resolve('HW', 'dist'),
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      // loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true,
      //     failOnError: true,
      //   },
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: 'home.html',
      filename: 'home.html',
      chunks: ['home'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'blog.html',
      filename: 'blog.html',
      chunks: ['blog'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'posts.html',
      filename: 'posts.html',
      chunks: ['posts'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'postForm.html',
      filename: './postForm.html',
      chunks: ['postForm'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'authors.html',
      filename: './authors.html',
      chunks: ['authorsPage'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([{from: 'img', to: 'img'}]),
    new CopyWebpackPlugin([{from: 'video', to: 'video'}]),
    new CopyWebpackPlugin([{from: 'audio', to: 'audio'}]),
  ],
  devServer: {
    contentBase: path.join('HW', 'dist'),
    compress: false,
    port: 9000,
    open: true,
    openPage: 'home.html',
  },
};
