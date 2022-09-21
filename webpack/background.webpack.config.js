const path = require('path');

module.exports = {
  entry: './ts/background/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, '../dist/js-bundles')
  }
};
