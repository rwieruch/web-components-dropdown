module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/lib',
    filename: 'bundle.js',
    library: 'road-dropdown',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
};
