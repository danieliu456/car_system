var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.jsx'],
    mode: 'development',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
    devServer: {
        contentBase: './dist'
      },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            
          },
          {
        test: /\.(css|scss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
        ]
        
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:3002'
        })
    }
}