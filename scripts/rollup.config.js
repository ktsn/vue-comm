const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const meta = require('../package.json')

const config = {
  entry: 'lib/index.js',
  moduleName: 'VueComm',
  exports: 'named',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      skip: ['vue']
    }),

    commonjs({
      sourceMap: false
    })
  ],
  external: ['vue'],
  globals: {
    vue: 'Vue'
  },
  banner: `/*!
 * ${meta.name} v${meta.version}
 * (c) 2016-2017 ${meta.author}
 * ${meta.homepage}
 *
 * Includes vue-class-component
 * (c) 2015-2017 Evan You
 * https://github.com/vuejs/vue-class-component
 *
 * @license
 * Released under the MIT license
 * ${meta.homepage}/blob/master/LICENSE
 */`
}

switch (process.env.BUILD) {
  case 'commonjs':
    config.dest = `dist/${meta.name}.cjs.js`
    config.format = 'cjs'
    break
  case 'development':
    config.dest = `dist/${meta.name}.js`
    config.format = 'umd'
    config.plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    )
    break
  case 'production':
    config.format = 'umd'
    config.plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    )
    break
  default:
    throw new Error('Unknown build environment')
}

module.exports = config
