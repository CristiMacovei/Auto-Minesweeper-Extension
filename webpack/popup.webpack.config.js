const path = require('path');

module.exports = {
  entry: './ts/popup/index.ts',
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
    filename: 'popup.js',
    path: path.resolve(__dirname, '../dist/js-bundles')
  }
};
