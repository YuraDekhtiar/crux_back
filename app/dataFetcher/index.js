const {DB} = require('./dataFetcherDAL');
const nodeCron = require('node-cron');
const CrUXUtil = require('../CrUXUtil/index')
const Timeout = require('await-timeout');

// Мінімальна затримка для запитів до GOOGLE CRUX
// 2.5 запити на 1 секунду
const MIN_TIME_DELAYS = 400;

module.exports = {
    getAllTrackingUrl: async () => {
        return await DB.getTrackingUrl().then(r => r)
    },
    addUrl: async (urls) => {
        return DB.saveTrackingUrl(urls, 0).then(r => r);
    },
    deleteUrl: async (id) => {
        return DB.deleteTrackingUrl(id).then(r => r);
    },
    stopSchedule: () => {
        return 'Scheduler stoped'
    },
    startSchedule: () => {
        return 'Scheduler started'
    },
    getMetrics: async (urlData) => {
        let startTime;
        let endTime;
        let data = [];
        for (const url of urlData.url) {
            startTime = new Date().getTime();
            data.push(await CrUXUtil.getCrUX(url));
            endTime = new Date().getTime();
            if ((endTime - startTime) < MIN_TIME_DELAYS) {
                await Timeout.set(MIN_TIME_DELAYS - (endTime - startTime));
            }
        }
        console.log(data)
        return data;
    },
};

//DB.deleteTrackingUrl([1,2,3,4,5,6]).then(r => console.log(r))
