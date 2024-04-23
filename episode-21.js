const puppeteer = require("puppeteer");
const fs = require("fs");
async function scrapeURLs(urls){
    try {
        const browser = await puppeteer.launch({headless:   false});

        const scrapingPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(() => {
                const title = document.querySelector('h1').textContent.trim();
                const description = document.querySelector('p').textContent.trim();

                return {title, description};
            });

            await page.close();
            
            return data;
        });

        const scrapedDataArray = await Promise.all(scrapingPromises);

        const outputData = 'outputData.json';
        fs.writeFileSync(outputData, JSON.stringify(scrapedDataArray));

        console.log('Scraped data from URLS written to file' + outputData);

        await browser.close();

    } catch (e) {
        console.log("Unable to scrape", e);
    }
}

const urls = [
    'https://example.com',
    'https://example.org',
    'https://example.net'
];

scrapeURLs(urls);