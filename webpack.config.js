const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/pages/index.js",
    about: "./src/pages/about.js",
  },
  devtool: 'source-map',
  output: {
    // path: path.join(__dirname, "dist"),
    path: path.join(__dirname, "docs"),
    filename: "js/[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env" ]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    contentBase: path.join(__dirname, "docs"),
    watchContentBase: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./public", to: "." }
      ],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'APP - Index',
      template: './src/html/index.html',
      chunks: ['index'],
      filename: 'index.html',
      scriptLoading: 'blocking'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'APP - About',
      template: './src/html/about.html',
      chunks: ['about'],
      filename: 'about.html',
      scriptLoading: 'blocking',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
}
