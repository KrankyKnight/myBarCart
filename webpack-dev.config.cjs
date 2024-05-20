const path = require('path');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

const serverConfig = {
  mode: 'development',
  target: 'node18.18',
  entry: './server/server.js',
  output: {
    filename: 'server.cjs',
    path: path.resolve(__dirname, 'build', 'server'),
  },
  plugins: [
    new MiniCssExtractplugin()
  ],
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
}

const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', 'client'),
  },
  plugins: [
    new MiniCssExtractplugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build', 'client'),
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

module.exports = [clientConfig, serverConfig];