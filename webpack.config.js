const HtmlWebpackPlugin = require('html-webpack-plugin');

      module.exports = {
        entry: './index.js',
        output: {
          filename: 'main.js',
          path: __dirname + '/dist'
        },
        module: {
          rules: [{
            test: /.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
          })
        ]
      };