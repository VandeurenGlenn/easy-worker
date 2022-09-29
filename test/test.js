const test = require('tape')
const EasyWorker = require('../dist/worker.cjs.js');

test('can spinup node Worker', async tape => {
  const worker = await new EasyWorker('./test/worker.js')
  const result = await worker.once(1)
  tape.ok(result === 2, 'can use once')
})

test('can spinup node Worker', async tape => {
  const worker = await new EasyWorker('./test/worker.js')

  const promise = new Promise((resolve, reject) => {
    worker.onmessage(data => {    
      tape.ok(data === 2, 'can message')
      worker.terminate()
      resolve()
    })
  })

  worker.postMessage(1)
  return promise  
})