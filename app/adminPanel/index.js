const {DB} = require('./adminPanelDAL');
const dataFetcher = require('../dataFetcher/index');


module.exports = {
    getMetricsByUrl: async () => {
        return await DB.getMetricsByUrl('').then(r => r)
    },
    getMetricsById: async (id) => {
        return await DB.getMetricsById(id).then(r => r)
    },
    getMetricsOnline: async (urls) => {
        const OkPacket = [];
        const data = [];
        for (const url of urls) {
            OkPacket.push(...await dataFetcher.saveData(await dataFetcher.getMetrics(url).then(r => r)));
        }
        return OkPacket.map(item => item.insertId);
    },



}











