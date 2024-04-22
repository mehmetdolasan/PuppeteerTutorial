const puppeteer = require("puppeteer");

async function captureAndGeneratePDF(url, outputPath){
    
    try {
        const browser = await puppeteer.launch({headless:   false});
        const page = await browser.newPage();

        await page.goto(url);

        await page.screenshot({path:    'episode-9-screenshot.png'});

        await page.pdf({path:   outputPath, format: 'A4'});

        await browser.close();
        console.log("Successfully generated screenshot and PDF");

    } catch (err) {
        console.log("Unable to generate Screenshot and PDF")
    }
}

const url = "http://google.com";
const outputPath = "episode-9.pdf";

captureAndGeneratePDF(url,outputPath);