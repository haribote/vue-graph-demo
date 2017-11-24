'use strict'
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  output: Object.assign({},
    baseWebpackConfig.output,
    {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    }
  ),

  devtool: 'inline-cheap-module-source-map',

  externals: [nodeExternals()]
})

module.exports = devWebpackConfig
