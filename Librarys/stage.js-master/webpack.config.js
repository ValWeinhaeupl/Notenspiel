const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// var merge = require('lodash.merge');
const pkg = require('./package.json');

const license = fs.readFileSync('./LICENSE.md', 'utf8');

const licenseBanner = `
Stage.js v${pkg.version}

${license}
`;

module.exports = [
  {
    entry: {
      'stage.web': './platform/web.js',
      'stage.cordova': './platform/cordova.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      library: 'Stage',
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
    optimization: {
      minimize: true
    },
    plugins: [
      new webpack.BannerPlugin(licenseBanner),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(false),
      }),
    ],
  },
  {
    entry: {
      'stage.web': './platform/web.js',
      'stage.cordova': './platform/cordova.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'Stage',
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    plugins: [
      // function
      new webpack.BannerPlugin(licenseBanner),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(false),
      }),
    ],
  }
];
