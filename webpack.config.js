
module.exports = {
  entry: './app01/js/test.js',
  mode: 'development',
  output: {
    path: __dirname + '/app01/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/app01/public',
    compress: true,
    port: 9000
  },
  
};
