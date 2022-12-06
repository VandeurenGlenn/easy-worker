import EasyWorker from '/src/worker.js'

const worker = new EasyWorker()

worker.onmessage(data => worker.postMessage(data + 1))
  