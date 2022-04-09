const {DB} = require('../adminPanel/adminPanelDAL');
const {util} = require('../utils/index')

const formFactor = {phone:'phone', desktop:'desktop'};

module.exports = {
    dynamicsUrl: async (url_id, dateFrom, dateTo) => {
        const data = await DB.getMetricsByUrlId(url_id, dateFrom, dateTo);
        const uniqueDates = [...new Set(data.map(i => util.convertDate(i.tracking_date)))];
        const uniqueUrl= [...new Set(data.map(i => i.url))];

        return {
            query_url_count: url_id.length,
            res_url_count: uniqueUrl.length,
            desktop: uniqueDates.map(date => {
                return {
                    date: date,
                    cls:dynamic.filterCLS(data.filter(i => i.metrics_name === 'cumulative_layout_shift' && i.form_factor === formFactor.desktop), date),
                    fid:dynamic.filterFID(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.desktop), date),
                    lcp:dynamic.filterLCP(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.desktop), date)
                }
            }),
            phone: uniqueDates.map(date => {
                return {
                    date: date,
                    cls: dynamic.filterCLS(data.filter(i => i.metrics_name === 'cumulative_layout_shift' && i.form_factor === formFactor.phone) ,date),
                    fid: dynamic.filterFID(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.phone), date),
                    lcp: dynamic.filterLCP(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.phone), date)
                }
            }),
            labels: uniqueDates
        }
    },
    staticUrl: async (url_id, date) => {
        const data = await DB.getMetricsByUrlId(url_id, date, date);
        const uniqueUrl= [...new Set(data.map(i => i.url))];
        return {
            query_url_count: url_id.length,
            res_url_count: uniqueUrl.length,
            desktop: {
                cls: static.filterCLS(data.filter(i => i.metrics_name === 'cumulative_layout_shift' && i.form_factor === formFactor.desktop)),
                fid: static.filterFID(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.desktop)),
                lcp: static.filterLCP(data.filter(i => i.metrics_name === 'largest_contentful_paint' && i.form_factor === formFactor.desktop))
            },
            phone: {
                cls: static.filterCLS(data.filter(i => i.metrics_name === 'cumulative_layout_shift' && i.form_factor === formFactor.phone)),
                fid: static.filterFID(data.filter(i => i.metrics_name === 'first_input_delay' && i.form_factor === formFactor.phone)),
                lcp: static.filterLCP(data.filter(i => i.metrics_name === 'largest_contentful_paint' && i.form_factor === formFactor.phone))
            }
        }
    }
}

const static = {
    filterCLS:(data) => {
        const cls = {
            good: { '0.02': [], '0.04': [], '0.06' :[], '0.08': [], '0.1': [] },
            needs_improvement: { '0.12': [], '0.16': [],'0.2': [], '0.25': [] },
            poor: { '0.3': [], '0.4': [], '0.5': [], '0.6': [], '0.7': [], '0.8': [], '0.9': [], '1.0': [] }
        }
        const result = groupMetricsUrl(data.filter(i => i.metrics_name === 'cumulative_layout_shift'), cls);
        return {...result.arrayMetrics, labels:result.labels};
    },
    filterFID: (data) => {
        const fid = {
            good: { '20': [], '40': [], '60' :[], '80': [], '100': [] },
            needs_improvement: { '120': [], '160': [], '200': [], '240': [], '300': [] },
            poor: { '320': [], '360': [],'400': [], '600': [], '800': [] }
        }
        const result = groupMetricsUrl(data.filter(i => i.metrics_name === 'first_input_delay'), fid);
        return {...result.arrayMetrics, labels:result.labels};
    },
    filterLCP: (data) => {
        const lcp = {
            good: { '500': [], '1000': [], '1500' :[], '2000': [], '2500': [] },
            needs_improvement: { '2700': [], '3000': [], '3500': [], '4000': []},
            poor: { '4500': [], '5000': [],'5500': [], '6000': [] }
        }
        const result = groupMetricsUrl(data.filter(i => i.metrics_name === 'largest_contentful_paint'), lcp);
        return{...result.arrayMetrics, labels:result.labels}
    }
}
const dynamic = {
    filterCLS: (data, date) => {
    const cls = {
        good: {min:0.0, max:0.1 },
        needs_improvement: {min:0.11, max:0.25 },
        poor: {min:0.26, max:this.min*100 },
    }
    return filter(data, cls, date)
},
    filterFID: (data, date) => {
    const fid = {
        good: {min:0, max:100 },
        needs_improvement: {min:100, max:300 },
        poor: {min:300, max:this.min*100 },
    }
    return filter(data, fid, date)
},
    filterLCP: (data, date) => {
    const lcp = {
        good: {min:0, max:2500 },
        needs_improvement: {min:2500, max:4000 },
        poor: {min:4000, max:this.min*100 },
    }
    return filter(data, lcp, date)
}
}

function groupMetricsUrl(data, arrayMetrics) {
    let prev = 0.00;
    const labels = [];
    for(const status in arrayMetrics) {
        for(const curr in arrayMetrics[status]) {
            labels.push(curr)
            arrayMetrics[status][curr] = (data.filter(i => i.percentiles_75 >= prev && i.percentiles_75 <= curr ).length)
            prev = parseFloat(curr) + 0.0001;
        }
    }
    return {arrayMetrics, labels};
}
function filter(data, metrics ,date) {
    return {
        good: {count: data.filter(i =>
                i.percentiles_75 >= metrics.good.min && metrics.good.max > i.percentiles_75
                && util.convertDate(i.tracking_date) === date).length},
        needs_improvement: {count: data.filter(i =>
                i.percentiles_75 >= metrics.needs_improvement.min
                && metrics.needs_improvement.max > i.percentiles_75
                && util.convertDate(i.tracking_date) === date).length},
        poor: {count: data.filter(i => i.percentiles_75 >= metrics.poor.min
                && metrics.poor.max > i.percentiles_75
                && util.convertDate(i.tracking_date) === date).length},
    }
}



