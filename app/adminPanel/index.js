const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');


module.exports = {
    getTrackedUrl: async () => DB.getTrackedUrl(),
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
        const res = [];
        for (const url of urls) {
            const dataPhone = await DB.getMetricsByUrl(url, {formFactor:'phone'});
            const dataDesktop = await DB.getMetricsByUrl(url, {formFactor:'desktop'});
            if(dataPhone.length === 0) {
                OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url, 'phone')));
            } else {
                res.push(...dataPhone)
            }
            if(dataDesktop.length === 0) {
                OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url, 'desktop')));
            } else {
                res.push(...dataDesktop)
            }
        }
        if(OkPacket.length > 0) {
            res.push(...await DB.getMetricsById(OkPacket.map(item => item.insertId)));
        }
        return res;
    },



}











