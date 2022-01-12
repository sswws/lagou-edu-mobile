module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    // 配置图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
}
