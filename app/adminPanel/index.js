const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');


module.exports = {
    getMetricsByUrl: async (params) => {
        const {urls} = params;
        const res = [];
        for(const url of urls) {
            res.push(...await DB.getMetricsByUrl(url, params).then(r => r))
        }
        return res;
    },
    getMetricsById: async (id) => {
        return await DB.getMetricsById(id);
    },
    getMetricsOnline: async (urls) => {
        const OkPacket = [];
        const res = [];
        for (const url of urls) {
            const dataPhone = await DB.getMetricsByUrl(url, {formFactor:'phone'});
            const dataDesktop = await DB.getMetricsByUrl(url, {formFactor:'desktop'});
            if(dataPhone.length === 0 || dataDesktop === 0) {
                OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url)));
            } else {
                res.push(...dataPhone)
                res.push(...dataDesktop)
            }
        }
        if(OkPacket.length > 0) {
            res.push(...await DB.getMetricsById(OkPacket.map(item => item.insertId)));
        }

        return res;
    },



}











