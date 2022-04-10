const Router = require('koa-router');
const router = new Router();
const dataFetcher = require('../dataFetcher/dataFetcherController');
const adminPanel = require('../adminPanel/adminPanelController');
const dataAggregationModule = require("../dataAggregationModule/dataAggregationModuleController");


router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        return next;
    })
    // dataFetcher
    .get('/dataFetcher/tracking_url', dataFetcher.trackingUrl)
    .post('/dataFetcher/add_url', dataFetcher.addUrl)
    .delete('/dataFetcher/delete_url', dataFetcher.deleteUrl)
    // adminPanel
    .get('/adminPanel/metrics_by_url_id/', adminPanel.metricsByUrlId)
    .get('/adminPanel/metrics_by_id', adminPanel.metricsById)
    .post('/adminPanel/analyze_url', adminPanel.analyzeUrl)
    .get('/adminPanel/tracked_url', adminPanel.trackedUrl)
    // dataAggregationModule
    .get('/statistics_charts', dataAggregationModule.staticUrl)
    .get('/dynamics_charts', dataAggregationModule.dynamicsUrl)


module.exports = {
    router,
};
