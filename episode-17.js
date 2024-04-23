const puppeteer = require("puppeteer");

async function disableJavaScript(url){
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        //Disable JavaScript
        await page.setJavaScriptEnabled(false);
        console.log("javascript is disabled");
        await page.goto(url);

        //Perform some operations
        await browser.close();

    } catch (e) {
        console.log("Error disabling Javascript",e)
    }
    
}
disableJavaScript('http://example.com');
    

