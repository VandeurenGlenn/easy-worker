# easy-worker

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
```js
const worker = await new EasyWorker('/test/www/worker.js')
worker.onmessage(event => console.log(event))
const result = await worker.once(1)
```
