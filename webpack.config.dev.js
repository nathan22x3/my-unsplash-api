const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const srcPath = (subdir) => {
  return path.join(__dirname, 'src', subdir);
};

module.exports = {
  entry: './src/server.ts',
  mode: 'development',
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
      routes: srcPath('routes'),
      services: srcPath('services'),
      utils: srcPath('utils'),
      validations: srcPath('validations'),
    },
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ['yarn run:dev'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
