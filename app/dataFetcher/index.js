const {DB} = require('./dataFetcherDAL');
const nodeCron = require('node-cron');

/*
nodeCron.schedule('* * * * * *', async () => {
    // This job will run every second
    console.log(await DB.getTrackingUrl());
})

*/




DB.getTrackingUrl().then(r => console.log(r))

/*

(async () => {
    await DB.getTrackingUrl()
})()
*/