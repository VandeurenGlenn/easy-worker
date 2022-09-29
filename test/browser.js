const puppeteer = require('puppeteer');
const serve = require('@vandeurenglenn/project/project-serve');

(async () => {
  const server = serve('./', 58877)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:58877/test/www/index.html');
  
  page.on('console', message =>  
    console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`)
  )

  page.on('workercreated', async worker => {
    console.log('Worker created: ' + worker.url())
  })

  page.on('workerdestroyed', worker => {
    console.log('Worker destroyed: ' + worker.url())
    browser.close()
    server.close()
  })
  
})();