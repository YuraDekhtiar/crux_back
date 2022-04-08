const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');
const {util} = require("../utils");


module.exports = {
    getTrackedUrl: async () => DB.getTrackedUrl(),
    getUrlHistory: async () => DB.getUrlHistory(),
    getMetricsByUrl: async (params) => {
        const {urls} = params;
        const res = [];
        for(const url of urls) {
            res.push(...await DB.getMetricsByUrl(url, params).then(r => r))
        }
        return res;
    },
    getMetricsById: async (id) => await DB.getMetricsById(id),
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











