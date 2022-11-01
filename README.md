# easy-worker
> the easiest worker

## what?
same api for nodejs and browsers

## install
```sh
npm i @vandeurenglenn/easy-worker
```
## import
### commonjs
```js
const Worker = require('@vandeurenglenn/easy-worker')
```

### module
```js
import Worker from '@vandeurenglenn/easy-worker'
```

## usage

### main
```js
const worker = await new EasyWorker('/test/www/worker.js')
// using events
worker.onmessage(event => console.log(event))
worker.postMessage(1)

// or
// get result and close
const result = await worker.once(1)
```

### worker
```js
const worker = await new EasyWorker()

worker.onmessage(data => worker.postMessage(Number(data) + 1))
```