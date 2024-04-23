const puppeteer = require("puppeteer");

(async () => {
        const browser = await puppeteer.launch({headless:   false});
        const page = await browser.newPage();

        await page.goto("http://example.com");
        
        await page.goto("https://finance.yahoo.com");
        
        await page.goBack();

        //Operations here
        const title = await page.title();
        console.log(title);

        await page.goForward();

        await browser.close();
})();
