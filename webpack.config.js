const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  console.log(env, argv);
  console.log("Mode: " + argv.mode);

  return {
    entry: {
      index: "./src/pages/index.js",
      about: "./src/pages/about.js",
      vue: "./src/pages/vue.js",
      vue2: "./src/pages/vue2.js",
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
        chunks: ['index'],
        filename: 'index.html',
        scriptLoading: 'blocking'
        // myPageHeader: 'Hello World',
      }),
      new HtmlWebpackPlugin({
          hash: true,
          title: 'APP - About',
          template: './src/html/about.html',
          chunks: ['about'],
          filename: 'about.html',
          scriptLoading: 'blocking'
          // myPageHeader: 'About',
      }),
      new HtmlWebpackPlugin({
          hash: true,
          title: 'APP - Vue',
          template: './src/html/vue.html',
          chunks: ['vue'],
          filename: 'vue.html',
          scriptLoading: 'blocking'
      }),
      new HtmlWebpackPlugin({
          hash: true,
          title: 'APP - Vue2',
          template: './src/html/vue2.html',
          chunks: ['vue2'],
          filename: 'vue2.html',
          scriptLoading: 'blocking'
      }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    },
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
}
