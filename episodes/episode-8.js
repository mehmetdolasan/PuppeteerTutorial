const puppeteer = require("puppeteer");

async function generateScreenShot(url, outputPath){

    try {
        const browser = await puppeteer.launch({headless:   false});
        const page = await browser.newPage();

        await page.goto(url);

        await page.screenshot({path:    outputPath});

        await browser.close();
        console.log("Screenshot generated successfully");

    } catch (err) {
        console.log("Unable to generate screenshots")
    }
}

const url = "https://google.com";
const outputPath = "google-screenshot.png";

generateScreenShot(url, outputPath);