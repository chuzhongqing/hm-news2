// 配置webpack
module.exports = {
  devServer: {
    //项目自启动
    open: true,
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          // rem的单位， 因为使用了lib-flexible, lib-flexible会把所有的屏幕分成10份
          // 1rem 就应该配置为 设计图的  1/10 之所以写成37.5是为了配合第三方库 注意设计图也要缩小一倍来量
          require('postcss-px2rem')({
            remUnit: 36,
          }),
        ],
      },
    },
  },
}
