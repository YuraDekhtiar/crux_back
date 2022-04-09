const adminPanel = require('./index');
const {util} = require("../utils");

module.exports = {
    metricsByUrlId: async (ctx, next) => {
        try {
            const params = {
                url_id: util.toArray(ctx.query['url_id']),
                fromDate: ctx.query['from_date'],
                endDate: ctx.query['end_date'],
                limit: ctx.query['limit'],
                formFactor: ctx.query['form_factor'],
            }
            ctx.body = await adminPanel.getMetricsByUrlId(params);
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
}