require('dotenv/config');
const puppeteer = require('puppeteer');

async function run() {

    const url = 'https://phpmyadmin.umbler.com/';
    const server = process.env.SERVER;
    const user = process.env.USER;
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    await page.type('#input_servername', process.env.SERVER);
    await page.type('#input_username', process.env.USER);
    await page.type('#input_password', process.env.PASSWORD);
    await page.click('#input_go');
    await page.waitForNavigation();

    await browser.close();
}

run();