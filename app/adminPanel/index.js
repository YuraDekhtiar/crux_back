const {DB} = require('./adminPanelDAL');


module.exports = {
    getMetricsByUrl: async () => {
        return await DB.getMetricsByUrl('').then(r => r)
    },

}











