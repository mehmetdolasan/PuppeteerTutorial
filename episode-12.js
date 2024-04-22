const puppeteer = require("puppeteer");

async function interceptRequest(url){

    try {

        const browser = await puppeteer.launch({headless:   false});

        const page = await browser.newPage();

        await page.setRequestInterception(true);
        await page.on('request', (interceptedRequest) => {
            if(interceptedRequest.url().endsWith('.png')){
                interceptedRequest.abort();
                console.log("Request Aborted")
            }else {
                interceptedRequest.headers({'secretKey': 'abc123'});
                interceptedRequest.continue();
                console.log("Request Continued With Headers");
            }
        });

        await page.goto(url);

        await browser.close();

        console.log("Request Interception Completed");

        await page.waitForNavigation();

        browser.close();

    } catch (error) {
        console.log(error);
    }
}


interceptRequest("https://yahoo.com");

