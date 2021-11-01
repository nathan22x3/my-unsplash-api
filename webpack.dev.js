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
      '@app/configs': srcPath('configs'),
      '@app/constants': srcPath('constants'),
      '@app/controllers': srcPath('controllers'),
      '@app/middlewares': srcPath('middlewares'),
      '@app/models': srcPath('models'),
      '@app/routes': srcPath('routes'),
      '@app/services': srcPath('services'),
      '@app/utils': srcPath('utils'),
      '@app/validations': srcPath('validations'),
      '@app/test': srcPath('test'),
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
