const fetch = require('node-fetch')

// Settings
const API_KEY = 'AIzaSyAnT8DwD0QbBnBB1-h0zDhx6jsiFOxDYWg';
const API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;
const CRUX_METRICS = ['first_input_delay', 'largest_contentful_paint', 'cumulative_layout_shift'];

async function getCrUX(url, formFactor) {
    const params = {
        url: url,
        metrics: CRUX_METRICS,
        formFactor
    };
    const headers = {
        // referer
    }
    return {...await query(params, headers), url:url};

    //return generationDate(url, formFactor)

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

function generationDate(url, formFactor) {
    return {
        record: {
            key: {
            formFactor: formFactor,
            url: url
        },
        metrics: {
            largest_contentful_paint: {
                histogram: [
                    {
                        density: 0.7094808676578109
                    },
                    {
                        density: 0.17462832074092127
                    },
                    {
                        density: 0.11589081160126782
                    }
                ],
                    percentiles: {
                    p75: 2782
                }
            },
            cumulative_layout_shift: {
                histogram: [
                    {
                        density: 0.6898564826076379
                    },
                    {
                        density: 0.23145220141084893
                    },
                    {
                        density: 0.07869131598151317
                    }
                ],
                    percentiles: {
                    p75: "0.11"
                }
            },
            first_input_delay: {
                histogram: [
                    {
                        density: 0.7784320942215682
                    },
                    {
                        density: 0.10096920623236418
                    },
                    {
                        density: 0.12059869954606764
                    }
                ],
                    percentiles: {
                    p75: 79
                }
            }
        }
    },
    url:url
    }

}

module.exports = {
    getCrUX,
};
