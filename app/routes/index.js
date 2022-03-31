const Router = require('koa-router');
const router = new Router();

const dataFetcher = require('../dataFetcher/dataFetcherController');


router
    .get('/', async (ctx, next) => {
        ctx.body = 'Доброго вечора ми з України:)';

        return next;
    })
    .get('/dataFetcher', dataFetcher.get)
    .post('/dataFetcher/add_url', dataFetcher.addUrl)
    .delete('/dataFetcher/delete_url', dataFetcher.deleteUrl)
    .post('/dataFetcher/metrics', dataFetcher.getMetrics)
    .get('/dataFetcher/stop', dataFetcher.stopSchedule)
    .get('/dataFetcher/start', dataFetcher.startSchedule)




module.exports = {
    router,
};
