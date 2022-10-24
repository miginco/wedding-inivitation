const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// console.log(__dirname)
console.log(path.join(__dirname, '/src'))

module.exports = defineConfig({
  transpileDependencies: false,
  configureWebpack: {
    watchOptions :{
      aggregateTimeout: 300,
      poll: 1000
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.join(__dirname, '/src')
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
  },
})
