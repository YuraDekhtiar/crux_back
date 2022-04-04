const fetch = require('node-fetch')

// Settings
const API_KEY = 'AIzaSyAnT8DwD0QbBnBB1-h0zDhx6jsiFOxDYWg';
const API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;
const CRUX_METRICS = ['first_input_delay', 'largest_contentful_paint', 'cumulative_layout_shift'];

async function getCrUX(url, formFactor) {
    const data = [];
    const params = {
        url: url,
        metrics: CRUX_METRICS,
        formFactor
    };
    const headers = {
        // referer
    }
    await query(params, headers).then(res => data.push(res))


    return {...data[0], url:url};

}

async function query(payload, headers)  {
    const url = API_ENDPOINT;
    const options = {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(payload)
    };
    if (headers) {
        options.headers = headers;
    }
    return await fetch(url, options).then(res => res.json());
}

module.exports = {
    getCrUX,
};
