import Worker from './../src/worker.js'

(async () => {
  const worker = await new Worker()

  worker.onmessage(message => process.send(Number(message) + 1))

})()