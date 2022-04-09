const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');
const {util} = require("../utils");

module.exports = {
    getTrackedUrl: async () => DB.getTrackedUrl(),
    getMetricsByUrlId: async (params) => {
        // Доробити вивід по ID і вхідних параметрах
        const urls = await DB.getUrlHistory();
        const data = await DB.getMetricsByUrlId(urls.map(u => u.id), util.nowDate(), util.nowDate())
        return urls.map( u => {
                return {
                    url_id: u.id,
                    url: u.url,
                    desktop: {
                        cls: filterToTable(data, u.url, 'cumulative_layout_shift', 'desktop') ,
                        fid: filterToTable(data, u.url, 'first_input_delay', 'desktop'),
                        lcp: filterToTable(data, u.url, 'largest_contentful_paint', 'desktop'),
                    },
                    phone: {
                        cls: filterToTable(data, u.url, 'cumulative_layout_shift', 'phone'),
                        fid: filterToTable(data, u.url, 'first_input_delay', 'phone'),
                        lcp: filterToTable(data, u.url, 'largest_contentful_paint', 'phone'),
                    }
                }
            }
        );
    },
    getMetricsById: async (id) => await DB.getMetricsByUrlId(id),
    analyzeUrl: async (urls) => {
        const OkPacket = [];
        for (const url of urls) {
            const dataPhone = await DB.getMetricsByUrl(url, {formFactor:'phone'});
            const dataDesktop = await DB.getMetricsByUrl(url, {formFactor:'desktop'});
            if(dataPhone.length === 0) {
                OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url, 'phone')));
            } else {
                OkPacket.push(...dataPhone.map(i => i.url_id))
            }
            if(dataDesktop.length === 0) {
                OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url, 'desktop')));
            } else {
                OkPacket.push(...dataDesktop.map(i => i.url_id))
            }
        }
        return {url_id: [...new Set(OkPacket)]}
    },
}

function filterToTable(data, url, metrics_name, form_facrtor) {
    const r = data.filter(d => d.url === url && d.form_factor === form_facrtor && d.metrics_name === metrics_name);
    if(r.length === 0) {
        return {
            good: 0,
            needs_improvement: 0,
            poor: 0,
            p_75: 0,
        }
    }
    return {
        good: r[0].good,
        needs_improvement: r[0].needs_improvement,
        poor: r[0].poor,
        p_75: r[0].percentiles_75
    }

}











