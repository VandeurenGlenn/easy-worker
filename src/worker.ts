export default class EasyWorker {
  #messageEvent = 'message'
  #errorEvent = 'error'
  #isBrowser = false
  #isWorker = false

  worker: Worker

  get isWorker() {
    return this.#isWorker
  }
  constructor(url: string, options: {}) {
    return this.#init(url, options)
  }

  #init(url: string | URL, options = {}) {
    if (url) {
      if (globalThis.Worker) {
        this.#isBrowser = true
        this.worker = new Worker(url, {...options})
      } else {
        return new Promise(async (resolve, reject) => {
          const {fork} = await import('child_process')  
          this.worker = fork(url, ['easy-worker-child'], options)
          resolve(this)
        })
      }
    } else {
      this.#isWorker = true
      if (globalThis.process?.argv[2] === 'easy-worker-child') {
        this.worker = process
      } else {
        this.#isBrowser = true
        this.worker = globalThis
      }
    }
    
    return this
  }

  onmessage(fn: { (message: any): void; (arg0: any): any }): void {
    if (this.#isBrowser) this.worker.onmessage = ({data}) => fn(data)
    else this.worker.on(this.#messageEvent, fn)
  }

  postMessage(message: any): void {
    if (this.#isBrowser) this.worker.postMessage(message);
    else this.worker.send(message)
  }

  terminate(): void {
    if (this.#isBrowser) this.worker.terminate()
    else this.worker.kill()
  }

  onerror(fn: (error: any) => void): void {
    if (this.#isBrowser) this.worker.onerror = fn
    else this.worker.on(this.#errorEvent, fn)
  }

  /**
   * 
   * @param {*} data 
   * @returns {Promise} resolves result onmessage & rejects on error
   */
  once(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onmessage((message: unknown) => {
        resolve(message)
        this.terminate()
      })
      this.onerror((error: any) => {
        reject(error)
        this.terminate()
      })
      this.postMessage(data)
    })    
  }  
}