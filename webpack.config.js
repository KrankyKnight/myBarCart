const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');

module.exports = {
  mode: 'development',
    entry: './client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
        publicPath: '/',
      },
      compress: true,
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