const {DB} = require('./adminPanelDAL');


module.exports = {
    getMetricsByUrl: async () => {
        return await DB.getMetricsByUrl('').then(r => r)
    },

}


const data = [
    {
        "id": 1,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "desktop",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "cumulative_layout_shift",
        "good": 98.02,
        "needs_improvement": 1.32,
        "poor": 0.66,
        "percentiles": 0.66
    },
    {
        "id": 2,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "desktop",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "first_input_delay",
        "good": 95.32,
        "needs_improvement": 2.14,
        "poor": 2.54,
        "percentiles": 2.54
    },
    {
        "id": 3,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "desktop",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "largest_contentful_paint",
        "good": 73.34,
        "needs_improvement": 15.49,
        "poor": 11.17,
        "percentiles": 11.17
    },
    {
        "id": 4,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "phone",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "cumulative_layout_shift",
        "good": 69.69,
        "needs_improvement": 22.76,
        "poor": 7.55,
        "percentiles": 7.55
    },
    {
        "id": 5,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "phone",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "first_input_delay",
        "good": 77.95,
        "needs_improvement": 9.88,
        "poor": 12.17,
        "percentiles": 12.17
    },
    {
        "id": 6,
        "tracking_date": "2022-03-31T21:00:00.000Z",
        "form_factor": "phone",
        "url": "https://auto.ria.com/uk/",
        "metrics_name": "largest_contentful_paint",
        "good": 70.85,
        "needs_improvement": 17.27,
        "poor": 11.88,
        "percentiles": 11.88
    }
]








