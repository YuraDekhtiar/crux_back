const adminPanel = require('./index');
const {util} = require("../utils");

module.exports = {
    // Дописати отримання url;
    metricsByUrl: async (ctx, next) => {
        try {
            const params = {
                url: util.toArray(ctx.query['url']),
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
            ctx.body = await adminPanel.getMetricsById([20,30,160]);
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    getMetrics: async (ctx, next) => {
        try {
            //const url = 'https://auto.ria.com/uk/'
            //ctx.body = await dataFetcher.getMetrics(util.toArray(url));

            ctx.body = await adminPanel.getMetricsOnline(util.toArray(ctx.request.body.url));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    getMetricsGetTest: async (ctx, next) => {
        try {
            const url = 'https://auto.ria.com/uk/'

            ctx.body = await adminPanel.getMetricsOnline(util.toArray(url));
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
}