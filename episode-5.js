const puppeteer = require("puppeteer");

async function run(){

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    //Navigate to page
    await page.goto("http://google.com");

    //Extract images
    const images = await page.$$eval("img", (elements) =>
        elements.map((element) => ({
            src: element.src,
            alt: element.alt,
        }))

    );

    // Extract Links
    const links = await page.$$eval("a", (elements) =>
        elements.map((element) => ({
            href: element.href,
            text: element.textContent,
        }))
    );

    const imageCount = images.lenght;
    const linkCount = links.lenght;

    //output of the above
    const output = JSON.stringify({images, links, imageCount, linkCount});
    console.log(output);

    //close the browser
    await browser.close();

}

run();