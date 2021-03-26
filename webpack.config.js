const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = (env, argv) => {
  console.log(env, argv);
  console.log("Mode: " + argv.mode);

  return {
    entry: {
      vendor: Object.keys(package.dependencies),
      index: "./src/pages/index.js",
      about: "./src/pages/about.js",
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    output: {
      path: path.join(__dirname, "dist"),
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
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      watchContentBase: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./public",
            to: ".",
            // globOptions: {
            //   dot: true,
            //   gitignore: true,
            //   ignore: ["**/pages"],
            // }
          },
        ],
      }),
      new HtmlWebpackPlugin({
        hash: true,
        title: 'APP - Index',
        template: './src/html/index.html',
        chunks: ['index', 'vendor'],
        filename: 'index.html',
        scriptLoading: 'blocking'
        // myPageHeader: 'Hello World',
      }),
      new HtmlWebpackPlugin({
          hash: true,
          title: 'APP - About',
          template: './src/html/about.html',
          chunks: ['about', 'vendor'],
          filename: 'about.html',
          scriptLoading: 'blocking'
          // myPageHeader: 'About',
      })
    ],
  }
}
