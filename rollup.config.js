export default [{
  input: 'src/worker.js',
  output: [{
    format: 'es',
    file: './dist/worker.es.js'
  }, {
    format: 'cjs',
    file: './dist/worker.cjs.js'
  }, {
    format: 'iife',
    file: './dist/worker.iife.js'
  }]
}]