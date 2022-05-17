const { environment } = require('@rails/webpacker')

const path = require('path');

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
    }
  }
}

environment.config.merge(customConfig);

environment.splitChunks();

const webpack = require('webpack')

environment.plugins.append('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default'],
    Rails: '@rails/ujs'
  })
)

module.exports = environment
