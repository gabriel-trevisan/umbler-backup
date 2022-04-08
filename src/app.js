require('dotenv/config');
const puppeteer = require('puppeteer');

async function run() {

    const url = 'https://phpmyadmin.umbler.com/';
    const server = process.env.SERVER_NAME;
    const user = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (server === "") {
        console.log("Server must not be empty");
        return;
    }

    if (user === "") {
        console.log("User must not be empty");
        return;
    }

    if (password === "") {
        console.log("Password must not be empty");
        return;
    }

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto(url);

    await page.type('#input_servername', server);
    await page.type('#input_username', user);
    await page.type('#input_password', password);
    await page.click('#input_go');
    await page.waitForNavigation();

    await page.goto(`${url}index.php?route=/server/export`);

    //Chromium is breaking the CSS element (#buttonGo) and it is preventing you from clicking on the element
    //Below the solution
    await page.evaluate(() => {
        document.querySelector(".exportoptions #buttonGo").style = "float: none";
    })

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: process.env.PATH_DOWNLOAD
    });

    await page.click('#buttonGo');
}

run();