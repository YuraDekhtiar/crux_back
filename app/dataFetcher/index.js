const {DB} = require('./dataFetcherDAL');
const nodeCron = require('node-cron');
const CrUXUtil = require('../CrUXUtil/index')
const Timeout = require('await-timeout');


module.exports = {
    getAll: () => 'all urls',
    stopSchedule: () => {
        return 'Scheduler stoped'
    },
    startSchedule: () => {
        return 'Scheduler started'
    },
    getMetrics: async (urlData) => {
        return 'getMetrics'
    },
    addUrl: async (urlData) => {
        return DB.saveTrackingUrl(urlData, 0).then(r => r);
    },

};