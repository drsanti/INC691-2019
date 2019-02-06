const path = require('path');
module.exports = {
  entry: './ex-01/usr/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'ex-01/public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'ex-01/public'),
    compress: true,
    port: 9000
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
