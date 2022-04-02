const {DB} = require('./dataFetcherDAL');
const nodeCron = require('node-cron');
const CrUXUtil = require('../CrUXUtil/index')
const {util} = require('../utils/index')

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
    getMetrics: async (urls, saveToDB = true) => {
        const data = [];
        for (const url of urls) {
            data.push(await getMetrics(url).then(r => r));
        }
        await saveData(data);
        return data;
    },
};

async function getMetrics(url)  {
    const startTime = new Date().getTime();
    const res = await CrUXUtil.getCrUX(url);
    const endTime = new Date().getTime();
    return {res, requestTime:(endTime - startTime)};
}

async function saveData(data) {
    data.forEach(item => saveMetrics(item.res))
}

async function saveMetrics(data) {
    for (const item of data.data) {
        if (typeof item.error === 'undefined') {
            await DB.addHistoryUrl(data.url)
            await DB.addTrackingUrl(util.toArray(data.url), 1)
            await DB.saveMetrics(data.url, item)
        } else {
            await DB.addTrackingUrl(util.toArray(data.url), 0)
        }
    }
}

/*
const task = nodeCron.schedule(`00 00 05 * * *`, async () => {
    console.log(new Date());

})
task.start();
*/

async function temp() {
    const data = await DB.getTrackingUrl().then(r => r)

    for(const item of data) {
        await getMetrics(item.url).then(r => console.log(r))
    }

}
//temp();



//DB.getTrackingUrl().then(r => console.log(  r))
