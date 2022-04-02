const Router = require('koa-router');
const router = new Router();

const dataFetcher = require('../dataFetcher/dataFetcherController');
const adminPanel = require('../adminPanel/adminPanelController');


router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;


    })
    // dataFetcher routes
    .get('/dataFetcher', dataFetcher.get)
    .post('/dataFetcher/add_url', dataFetcher.addUrl)
    .delete('/dataFetcher/delete_url', dataFetcher.deleteUrl)
    .post('/dataFetcher/metrics_to_url', dataFetcher.getMetrics)
    .get('/dataFetcher/metrics_to_url', dataFetcher.getMetrics)
    .get('/dataFetcher/stop', dataFetcher.stopSchedule)
    .get('/dataFetcher/start', dataFetcher.startSchedule)
    // adminPanel routes
    .get('/adminPanel/metrics', adminPanel.get)

module.exports = {
    router,
};
