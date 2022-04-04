const {DB} = require('./dataFetcherDAL');
const nodeCron = require('node-cron');
const CrUXUtil = require('../CrUXUtil/')
const {util} = require('../utils/index')

// Мінімальна затримка для запитів до GOOGLE CRUX
// 2.5 запити на 1 секунду
const MIN_TIME_DELAYS = 400;

module.exports = {
    getAllTrackingUrl: async () => {
        return await DB.getTrackingUrl().then(r => r)
    },
    addUrl: async (url) => {
        return await DB.addTrackingUrl(url, 0);
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
    getMetrics: (url, formFactor) => getMetrics(url, formFactor),
    saveData: (data) => saveData(data)

};

async function getMetrics(url, formFactor)  {
    const startTime = new Date().getTime();
    const res = await CrUXUtil.getCrUX(url, formFactor);
    const endTime = new Date().getTime();
    return {res, requestTime:(endTime - startTime)};
}

async function saveData({res}) {
    const OkPacket = [];

    if(typeof res.error === 'undefined') {
        await DB.addTrackingUrl(util.toArray(res.url), 1);
        await DB.addHistoryUrl(res.url);
        OkPacket.push(...await DB.saveMetrics(res.url, res.record))
    } else {
        await DB.addTrackingUrl(util.toArray(res.url), 0)
    }
    return OkPacket;
}

const task = nodeCron.schedule(`00 00 05 * * *`, async () => {
    for (const item of await DB.getTrackingUrl().then(r => r)) {
        await saveData(await getMetrics(item.url).then(r => r));
    }
    console.log('End');
})
task.start();


//DB.getTrackingUrl().then(r => console.log(  r))
