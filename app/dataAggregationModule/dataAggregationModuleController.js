const dataAggregationModule = require("./index");
const {util} = require("../utils");

module.exports = {
    staticUrl: async (ctx, next) => {
        try {
            ctx.body = await dataAggregationModule.staticUrl(util.toArray(ctx.query['url_id']), ctx.query['date']);
            ctx.status = 200;
        } catch (e) {
            console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
            ctx.status = 500;
        }
        return next();
    },
    dynamicsUrl: async (ctx, next) => {
    try {
        ctx.body = await dataAggregationModule.dynamicsUrl(util.toArray(ctx.query['url_id']), ctx.query['date_from'], ctx.query['date_to']);
        ctx.status = 200;
    } catch (e) {
        console.error(`ERROR -> ${e?.message}, PATH -> ${__filename}, METHOD -> get`);
        ctx.status = 500;
    }
    return next();
},

}