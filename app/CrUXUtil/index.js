const fetch = require('node-fetch')

// Settings
const API_KEY = 'AIzaSyAnT8DwD0QbBnBB1-h0zDhx6jsiFOxDYWg';
const API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;
const CRUX_METRICS = ['first_input_delay', 'largest_contentful_paint', 'cumulative_layout_shift'];
const HISTOGRAM_STATUS = ['good', 'needs_improvement', 'poor'];
const FORM_FACTOR = ['desktop', 'phone', 'tablet']

async function getCrUX(url) {
    const data = [];
    for (const formFactor of FORM_FACTOR) {
        const params = {
            url: url,
            metrics: CRUX_METRICS,
            formFactor
        };
        const headers = {
            // referer
        }
        await query(params, headers).then(res => data.push(res))
    }

    return {url:url, data:format(data)};
    //return data;

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

function format(payload) {
    const data = [];
    for (const item of payload) {
        if(item.error)
            data.push(item);
        else
            data.push(getRecord(item));
    }
    return data;
}

function getRecord(payload) {
    let metrics = {};
    for (const item in payload.record.metrics) {
        metrics = {...metrics,[item]:getHistogram(payload.record.metrics[item])};
    }
    return {formFactor:payload.record.key.formFactor, metrics};
}

function getHistogram(payload) {
    const histogram = [];
    for (let i = 0; i < payload.histogram.length; i++) {
        histogram.push({[HISTOGRAM_STATUS[i]]:(payload.histogram[i].density * 100).toFixed(2)});
    }

    return {histogram, percentiles:payload.percentiles.p75};
}

module.exports = {
    getCrUX,
};
