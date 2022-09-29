import EasyWorker from '/dist/worker.es.js'

const worker = new EasyWorker()

worker.onmessage(data => worker.postMessage(data + 1))
    // onmessage = message => {
    //   postMessage(Number(message.data) + 1)
    // }
  