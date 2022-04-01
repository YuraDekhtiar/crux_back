const {DB} = require('./dataFetcherDAL');
//const nodeCron = require('node-cron');
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
        return DB.addTrackingUrl(urls, 0).then(r => r);
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
    // Якщо saveToDB === false, зберігання до БД не відбувається
    getMetrics: async (urls, saveToDB = false) => {
        let startTime;
        let endTime;
        const data = [];
        let item = [];
        for (const url of urls) {
            startTime = new Date().getTime();
            item = await CrUXUtil.getCrUX(url);
            data.push(item);
            if(saveToDB === true) await saveMetrics(item)
            endTime = new Date().getTime();
            if ((endTime - startTime) < MIN_TIME_DELAYS) {
                await Timeout.set(MIN_TIME_DELAYS - (endTime - startTime));
            }
        }
        return data;
    },
};

async function saveMetrics(data) {
    for (const item of data.data) {
        if (typeof item['error']) {
            await DB.addHistoryUrl(data.url)
            await DB.saveMetrics(data.url, item)
        }
    }
}

//DB.addHistoryUrl('ssss').then(r => console.log(  r))
