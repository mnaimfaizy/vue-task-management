const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: process.env.BACKEND_URL,
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: { '^/api': '/' },
  //     }
  //   }
  // },
  transpileDependencies: true
})
