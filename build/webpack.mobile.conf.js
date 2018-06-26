'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod.conf')

const webpackConfig = merge(prodWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/mobile.env')
    })
  ]
})

module.exports = webpackConfig
