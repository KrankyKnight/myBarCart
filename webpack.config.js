const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new MiniCssExtractplugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/server/server.js',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
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
              ['@babel/preset-env', { targets: "defaults" }], 
              ['@babel/preset-react', { targets: "defaults"}]
            ]
          }
        }
          
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractplugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
};