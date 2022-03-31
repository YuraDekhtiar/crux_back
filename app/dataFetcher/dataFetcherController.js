const readFromDB = require('../DB');
const dataFetcher = require('./index');

module.exports = {
    get: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.getAllTrackingUrl();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    stopSchedule: (ctx, next) => {
        try {
            ctx.body = dataFetcher.stopSchedule();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    startSchedule: (ctx, next) => {
        try {
            ctx.body = dataFetcher.startSchedule();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    addUrl: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.addUrl(ctx.request.body.url);
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    getMetrics: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.getMetrics(ctx.request.body);
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
}