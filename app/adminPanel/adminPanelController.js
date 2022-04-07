const adminPanel = require('./index');
const {util} = require("../utils");

module.exports = {
    metricsByUrl: async (ctx, next) => {
        try {
            const params = {
                urls: util.toArray(ctx.query['url']),
                fromDate: ctx.query['from_date'],
                endDate: ctx.query['end_date'],
                limit: ctx.query['limit'],
                formFactor: ctx.query['form_factor'],
            }

            ctx.body = await adminPanel.getMetricsByUrl(params);
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    metricsById: async (ctx, next) => {
        try {
            const id = ctx.query['id'];
            ctx.body = await adminPanel.getMetricsById(util.toArray(id));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    analyzeUrl: async (ctx, next) => {
        try {
            ctx.body = await adminPanel.analyzeUrl(util.toArray(ctx.request.body.url));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    getMetricsGetTest: async (ctx, next) => {
        try {
            const url = 'https://auto.ria.com/uk/legkovie/?page=11'

            ctx.body = await adminPanel.analyzeUrl(util.toArray(url));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    trackedUrl: async (ctx, next) => {
        try {
            ctx.body = await adminPanel.getTrackedUrl();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    urlHistory: async (ctx, next) => {
        try {
            ctx.body = await adminPanel.getUrlHistory();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
}