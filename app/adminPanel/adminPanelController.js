const adminPanel = require('./index');
const {util} = require("../utils");

module.exports = {
    // Дописати отримання url;
    metricsByUrl: async (ctx, next) => {
        try {
            ctx.body = await adminPanel.getMetricsByUrl();
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
}