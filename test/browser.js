import puppeteer from 'puppeteer'
import serve from '@vandeurenglenn/project/project-serve.js'


  const server = serve('./', 58877)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:58877/test/www/index.html');
  
  page.on('console', message =>  {
    if (message.text() !== '2') process.exit(1)
    else process.exit(0)
  }
    
  )

  page.on('workercreated', async worker => {
    console.log('Worker created: ' + worker.url())
  })

  page.on('workerdestroyed', worker => {
    console.log('Worker destroyed: ' + worker.url())
    browser.close()
    server.close()
  })
  