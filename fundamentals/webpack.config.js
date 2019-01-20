const path = require('path');

// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = function(dir) {
  return path.join(__dirname, dir)
};

module.exports = {
  entry: {
    index: [
      resolve('./src/js/index.js')
    ],
    test: [
      resolve('./src/js/test.js')
    ]
  },
  output: {
    path: resolve('webapp/WEB-INF'),
    filename: './js/[name].js'
  },

  plugins : [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: './html/index.html',
        chunks: [ 'index']
    }),
    new HtmlWebpackPlugin({
        template: 'src/test.html',
        filename: './html/test.html',
        chunks: [ 'test']
    }),
    new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
        filename: "./css/[name].css",
        chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'webapp/WEB-INF'),
    hot: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    open: true,
    port: 9000
  }

}
