

//!!

const _ROOT_ = './src/example3--Force';

//!!


const _MAIN_ = 'index.js';

const path = require('path');
module.exports = {
  entry: _ROOT_ + '/' + _MAIN_,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        loader:'style-loader!css-loader'
      }
    ]
  }
};
