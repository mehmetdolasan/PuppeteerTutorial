const puppeteer = require("puppeteer");
const fs = require("fs");

async function getSourceCode(url, outputData){
    try {
        const browser = await puppeteer.launch({headless:   false});
        const page = await browser.newPage();

        await page.goto(url);

        const sourceCode = await page.content();

        fs.writeFileSync(outputData, sourceCode, "utf-8");

        await browser.close();

        console.log("Successfully executed the source code of the URL");


    } catch (error) {
        console.error("Error getting source code of the url");
    }
}

const url = "https://example.com";
const outputData = "source_code.html";

getSourceCode(url, outputData);
