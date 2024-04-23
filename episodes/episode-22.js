const puppeteer = require("puppeteer");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const fs = require("fs");

async function extractDataFromSiteMap(siteMapUrl){
    try {
        // Extracting data from sitemap
        const response = await axios.get(siteMapUrl);
        const sitemap = response.data;
        // Parse the XML sitemap
        const parsedXML = await parseStringPromise(sitemap);
        
        // Extracting the URLs
        const urls = parsedXML.urlset.url.map(url => url.loc[0]);

        // Browserlaunch
        const browser = await puppeteer.launch();

        // Create the promise of looping all the URLs
        const scrapingDataPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(() => {
                const title = document.title;

                return {title};
            });

            await page.close();

            return data;
        });

        // Output file name
        const outputData = 'episode-22-sitemapData.json';
        
        // Resolve the promises
        const scrapedDataArray = await Promise.all(scrapingDataPromises);

        // Write it to the output file
        fs.writeFileSync(outputData, JSON.stringify(scrapedDataArray));

        // Closing the browser
        await browser.close();

    } catch (e) {
        console.log("Unable to extract data from sitemap",e);
    }
}

const siteMapUrl = "https://yoast.com/page-sitemap.xml";
extractDataFromSiteMap(siteMapUrl);