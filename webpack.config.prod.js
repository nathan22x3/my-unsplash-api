const path = require('path');
const nodeExternals = require('webpack-node-externals');

const srcPath = (subdir) => {
  return path.join(__dirname, 'src', subdir);
};

module.exports = {
  entry: './src/server.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      configs: srcPath('configs'),
      controllers: srcPath('controllers'),
      models: srcPath('models'),
      utils: srcPath('utils'),
      validations: srcPath('validations'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  externals: [nodeExternals()],
};
