const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.mjs'],
    alias: {
      process: 'process/browser',
    },
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      process: 'process/browser',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
