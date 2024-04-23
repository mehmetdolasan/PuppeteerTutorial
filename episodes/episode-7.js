const puppeteer = require("puppeteer");

async function generatePDF(url, outputfile){

    try{
        //Launch the browser
        const browser = await puppeteer.launch({headless:   false});
        const page = await browser.newPage();

        //Navigate to the page
        await page.goto("http://google.com");

        //Generate a PDF
        await page.pdf({path:   outputfile, format: 'A4'});

        //close the browser
        await browser.close();

    }catch(err) {
        console.log(err)
    }
}

const url = "http://google.com"
const outputfile = "output.pdf";

generatePDF(url,outputfile);