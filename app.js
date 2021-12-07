const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // Configure the navigation timeout: https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded
    await page.setDefaultNavigationTimeout(0)
    await page.goto('https://corona.bii.a-star.edu.sg/cgi-bin/coronamapBlast.pl')
    await page.waitForSelector('a[href*="../mendel"]', { timeout: 1000 })

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a[href*="../mendel"]')].map(a => a.href)

    })
    console.log(links)

    await browser.close()
  } catch (error) {
    console.log(error)
  }
})()