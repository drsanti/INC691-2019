const path = require('path');

const _mode = 'app';

module.exports = {
  entry: (_mode === 'app') ? './ex-02/src/index.js' : './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'ex-02/public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'ex-02/public'),
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
