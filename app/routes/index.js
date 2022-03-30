const Router = require('koa-router');
const router = new Router();

router
    .get('/', async (ctx, next) => {
        ctx.body = 'Доброго вечора ми з України:)';

        return next;
    })


module.exports = {
    router,
};
