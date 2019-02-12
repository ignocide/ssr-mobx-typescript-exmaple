const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const webpack = require('webpack');
module.exports = withTypescript(withSass({
  webpack(config, options) {
    // // Do not run type checking twice:
    // if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());
    //
    return config;
  },
}));