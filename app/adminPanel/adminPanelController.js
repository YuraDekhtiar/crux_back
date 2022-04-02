const dataFetcher = require('./index');

function toArray(data) {
    return Array.isArray(data) ? data : [data]
}

module.exports = {
    get: async (ctx, next) => {
        try {
            ctx.body = await dataFetcher.getMetricsByUrl();
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
}