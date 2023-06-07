const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
    entry: './client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
        publicPath: '/server.js',
      },
      proxy: {
        '/api': 'http://localhost:8080',
      }
    },
    module : {
      rules: [
        { 
          test: /\.jsx?/,
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults"}], 
                ['@babel/preset-react', { targets: "defaults"}]
              ]
            }
          }
            
        },
        {
            test: /\.s?css$/,
            use: [
              {
                loader: "style-loader" // creates style nodes from JS strings
              },
            {
              loader: "css-loader" // translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        },
      ]
    }
  };