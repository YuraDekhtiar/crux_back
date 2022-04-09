const Router = require('koa-router');
const router = new Router();
const dataFetcher = require('../dataFetcher/dataFetcherController');
const adminPanel = require('../adminPanel/adminPanelController');
const dataAggregationModule = require("../dataAggregationModule/dataAggregationModuleController");

const {getData} = require("../adminPanel");

router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))

        ctx.body = await getData();



        //ctx.body = routes;
        //ctx.body.push({metricsDate:'http://127.0.0.1:3000/adminPanel/metrics/?url=https://auto.ria.com/uk/&from_date=2022-03-02&end_date=2022-04-04'});


        return next;

    })
    // dataFetcher
    .get('/dataFetcher/tracking_url', dataFetcher.trackingUrl)
    .post('/dataFetcher/add_url', dataFetcher.addUrl)
    .delete('/dataFetcher/delete_url', dataFetcher.deleteUrl)
    // adminPanel
    .get('/adminPanel/metrics/', adminPanel.metricsByUrlId)
    .get('/adminPanel/metrics_by_id', adminPanel.metricsById)
    .post('/adminPanel/analyze_url', adminPanel.analyzeUrl)
    .get('/adminPanel/url_history', adminPanel.urlHistory)
    .get('/adminPanel/tracked_url', adminPanel.trackedUrl)
    .get('/statistics_charts', dataAggregationModule.staticUrl)
    .get('/dynamics_charts', dataAggregationModule.dynamicsUrl)


module.exports = {
    router,
};


const a = 0.1;
console.log(a > 0 && a <= 0.1)