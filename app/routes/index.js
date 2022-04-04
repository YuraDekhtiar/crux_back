const Router = require('koa-router');
const router = new Router();

const dataFetcher = require('../dataFetcher/dataFetcherController');
const adminPanel = require('../adminPanel/adminPanelController');

const crux = require('../CrUXUtil');


router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        ctx.body.push({metricsDate:'http://127.0.0.1:3000/adminPanel/metrics/?url=https://auto.ria.com/uk/&from_date=2022-03-02&end_date=2022-04-04'});

        return next

    })
    // dataFetcher
    .get('/dataFetcher/tracking_url', dataFetcher.trackingUrl)
    .post('/dataFetcher/add_url', dataFetcher.addUrl)
    .delete('/dataFetcher/delete_url', dataFetcher.deleteUrl)
    .get('/dataFetcher/stop', dataFetcher.stopSchedule)
    .get('/dataFetcher/start', dataFetcher.startSchedule)
    // adminPanel
    .get('/adminPanel/metrics/', adminPanel.metricsByUrl)
    .get('/adminPanel/metrics_by_id', adminPanel.metricsById)
    .post('/adminPanel/analyze_url', adminPanel.analyzeUrl)

    .get('/adminPanel/analyze_url', adminPanel.getMetricsGetTest)     // видалити після тестування

    .get('/adminPanel/tracked_url', adminPanel.trackedUrl)

module.exports = {
    router,
};
function test() {
    const date = new Date();
    return new Date().toISOString().slice(0, 10)
}
console.log(   test());
