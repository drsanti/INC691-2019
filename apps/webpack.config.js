const path = require('path');

//!! Mode 'dev' or 'app'
const _mode = 'app';

const config = {
  app: {
    root: 'apps',
    main: 'index.js'
  },
  dev: {
    main: 'index.js'
  }
}

module.exports = {
  entry: (_mode === 'app') ? './' + config.app.root + '/src/' + config.app.main  :  './src/' + config.dev.main,
  mode: 'development',
  //watch: true,
  output: {
    path: path.resolve(__dirname, config.app.root + '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, config.app.root + '/public'),
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
