const path = require('path')

const pkg = require('../package.json')

require('esbuild').buildSync({
  entryPoints: ['lib/index.tsx'],
  outdir: path.join(__dirname, '../'),
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'es5',
  external: ['react', ...Object.keys(pkg.dependencies)],
  logLevel: 'info',
})
