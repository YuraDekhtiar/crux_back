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
    getMetrics: (url) => getMetrics(url),
    saveData: (data) => saveData(data)

};

async function getMetrics(url)  {
    const startTime = new Date().getTime();
    const res = await CrUXUtil.getCrUX(url);
    const endTime = new Date().getTime();
    return {res, requestTime:(endTime - startTime)};
}

async function saveData({res}) {
    const OkPacket = [];
    for (const item of res.data) {
       if (typeof item.error === 'undefined') {
            await DB.addHistoryUrl(res.url);
            await DB.addTrackingUrl(util.toArray(res.url), 1);
            OkPacket.push(...await DB.saveMetrics(res.url, item))
        } else {
            await DB.addTrackingUrl(util.toArray(res.url), 0)
        }
    }
    return OkPacket;
}

/*
const task = nodeCron.schedule(`00 00 05 * * *`, async () => {
    console.log(new Date());

})
task.start();
*/

async function temp() {
    const data = [];
    for (const item of await DB.getTrackingUrl().then(r => r)) {
        await saveData(await getMetrics(item.url).then(r => r));
    }
    console.log('End')
}

//temp();



//DB.getTrackingUrl().then(r => console.log(  r))
