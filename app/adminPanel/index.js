const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');


module.exports = {
    getMetricsByUrl: async (params) => {
        return await DB.getMetricsByUrl(params);
    },
    getMetricsById: async (id) => {
        return await DB.getMetricsById(id);
    },
    getMetricsOnline: async (urls) => {
        const OkPacket = [];
        for (const url of urls) {
            OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url).then(r => r)));
        }

        return await DB.getMetricsById(OkPacket.map(item => item.insertId));
    },



}











