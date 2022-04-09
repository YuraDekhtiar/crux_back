const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');
const {util} = require("../utils");


function filter(data, url, metrics_name, form_facrtor) {
    const r = data.filter(d => d.url === url && d.form_factor === form_facrtor && d.metrics_name === metrics_name)
    return r.map(i => {
        return {
            good: i.good,
            needs_improvement: i.needs_improvement,
            poor: i.poor,
            p_75: i.percentiles_75
        }

    })
}

module.exports = {
    getData: async () => {
        const urls = await DB.getUrlHistory();
        const data = await DB.getMetricsByUrlId(urls.map(u => u.id), util.nowDate(), util.nowDate())
        //return data;
        return urls.map( u => {
                return {
                    url_id: u.id,
                    url: u.url,
                    desktop: {
                        cls: filter(data, u.url, 'cumulative_layout_shift', 'desktop'),
                        fid: filter(data, u.url, 'first_input_delay', 'desktop'),
                        lcp: filter(data, u.url, 'largest_contentful_paint', 'desktop'),
                    },
                    phone: {
                        cls: filter(data, u.url, 'cumulative_layout_shift', 'phone'),
                        fid: filter(data, u.url, 'first_input_delay', 'phone'),
                        lcp: filter(data, u.url, 'largest_contentful_paint', 'phone'),
                    }
                }
            }
        );
    },










    getTrackedUrl: async () => DB.getTrackedUrl(),
    getUrlHistory: async () => DB.getUrlHistory(),
    getMetricsByUrlId: async (params) => {
        return await DB.getMetricsByUrlId(params.url_id, util.nowDate(), util.nowDate());
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











