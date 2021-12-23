console.time('test')

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
})

const test = require('baretest')('hypobox')
const assert = require('assert')

require('./index.test.js')(test, assert)
;(async function () {
  await test.run()
  console.timeEnd('test')
})()
