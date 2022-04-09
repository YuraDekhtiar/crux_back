const {DB} = require('./dataFetcherDAL');
const adminPanelDAL = require('../adminPanel/adminPanelDAL');

const nodeCron = require('node-cron');
const CrUXUtil = require('../CrUXUtil/')
const {util} = require('../utils/index')

module.exports = {
    getAllTrackingUrl: async () => {
        return await DB.getTrackingUrl().then(r => r)
    },
    addUrl: async (url) => {
        return await DB.addTrackingUrl(url, 0,  null);
    },
    deleteUrl: async (id) => {
        return await DB.deleteTrackingUrl(id);
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
    await imitUpdateEveryDay();
})
task.start();

async function imitUpdateEveryDay() {
    console.log('START - imitUpdateEveryDay');

    for (const item of await DB.getTrackingUrl().then(r => r)) {
        const dataPhone = await adminPanelDAL.DB.getMetricsByUrl(item.url, {formFactor:'phone'});
        const dataDesktop = await adminPanelDAL.DB.getMetricsByUrl(item.url, {formFactor:'desktop'});

        if(dataPhone.length === 0) {
            await saveData(await getMetrics(item.url, 'phone'));
        }
        if(dataDesktop.length === 0) {
           await saveData(await getMetrics(item.url, 'desktop'));
        }
    }
    console.log('END - imitUpdateEveryDay');
}
//imitUpdateEveryDay();

//DB.getTrackingUrl().then(r => console.log(  r))

