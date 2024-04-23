const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ]);

    await page.goto("http://yahoo.com");

    //ToDo
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ])

    let totalBytes = 0;
    let usedBytes = 0;

    for(const entry of jsCoverage) {
        totalBytes += entry.text.length;
        for(const range of entry.ranges){
            usedBytes += range.end - range.start -1;
        }
    }

    for(const entry of cssCoverage) {
        totalBytes += entry.text.length;
        for(const range of entry.ranges){
            usedBytes += range.end - range.start -1;
        }
    }

    console.log(totalBytes);
    console.log(usedBytes);

    await browser.close();

})();