const dataFetcher = require('./index');

const {util} = require('../utils/index')

module.exports = {
    trackingUrl: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.getAllTrackingUrl();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    addUrl: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.addUrl(util.toArray(ctx.request.body.url));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    deleteUrl: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.deleteUrl(util.toArray(ctx.request.body.id));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
}