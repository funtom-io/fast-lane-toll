const axios = require('axios');
const cheerio = require('cheerio');
const fdk = require('@fnproject/fdk');

fdk.handle(function (input) {
    return getPriceFromFastlane()
}, {})

function getPriceFromFastlane() {
    return axios.get('https://fastlane.co.il/')
        .then(response => {
            const html = response.data;
            return {
                price: parsePrice(html),
                timestamp: new Date().getTime()
            };
        })
        .catch(error => {
            console.error('Error fetching price:', error);
            throw error;
        });
}

function parsePrice(html) {
    const $ = cheerio.load(html);
    const priceText = $('#lblPrice').text();
    return priceText.trim().replace('₪', '');
}