// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// const webpack = require('webpack')

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      symlinks: false,
      alias: {
        vue$: 'vue/dist/vue.common'
      }
    }
    // plugins: [
    //   // new BundleAnalyzerPlugin(),
    //   new webpack.ProvidePlugin({
    //     introJs: ['intro.js']
    //   })
    // ]
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/main.scss"`
      }
    }
  }
}
