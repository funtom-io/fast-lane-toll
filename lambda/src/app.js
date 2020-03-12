const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const now = new Date().getTime();
    try {
        const price = await fetchCurrentPrice(browser);
        await saveCurrentPrice(now, price)
    } catch (e) {
        await reportFailure(now, e);
    } finally {
        await browser.close()
    }

})();

async function fetchCurrentPrice(browser) {
    const page = await browser.newPage();
    await page.goto('https://fastlane.co.il/', {waitUntil: 'domcontentloaded'});

    const price = await page.evaluate(() => {
        return  document.getElementById("lblPrice").innerHTML;
    });

    const priceInt = parseInt(price, 10);

    if (typeof  priceInt !== 'number') {
        throw new Error('fetched price in not of type number. ' + price);
    }

    return priceInt;
}

async function saveCurrentPrice(now, price) {
    console.info({
        timestamp: now,
        price: price
    });
}

async function reportFailure(now, e) {
    console.error(e);
}