const puppeteer = require("puppeteer");
const device = puppeteer.KnownDevices["iPhone 13 Pro Max"];

(async () => {
    const browser = await puppeteer.launch({headless:   false});
    const page = await browser.newPage();

    await page.emulate(device);
    await page.goto("https://yahoo.com");
    
    await page.screenshot({path:    'iphone13.png'})

    await browser.close();
    

})();


