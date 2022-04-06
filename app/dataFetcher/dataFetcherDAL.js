const queryDB = require('../DB');
const {util} = require("../utils");

module.exports = {
    DB: {
        getTrackingUrl: () => queryDB(`SELECT * FROM tracking_url ORDER BY success`),
        addTrackingUrl: (url, success, date) => {
            const insertDate = date === null ? date : util.nowDate();
            return queryDB(
                `INSERT INTO tracking_url (url, last_tracking_date, success) VALUES ?
                ON DUPLICATE KEY UPDATE last_tracking_date='${util.nowDate()}', success=${success}`,
                [url.map(u => [u, insertDate, success])]
            )
        },
        deleteTrackingUrl: (id) => queryDB(`DELETE FROM tracking_url WHERE (id) IN (?)`,
                    [id.map(item => [item])]
                ),
        addHistoryUrl: (url) => (queryDB(`INSERT INTO url_history (url) VALUES ('${url}') ON DUPLICATE KEY UPDATE url = '${url}'`)),
        saveMetrics: async (url, data) => {
            const OkPacket = [];
            let metrics;
            let percentiles75;
            for (const item in data.metrics) {
                percentiles75 = data.metrics[item].percentiles.p75
                metrics = data.metrics[item].histogram;
                 const idLatestHistogram = await queryDB(`INSERT INTO histogram (good, needs_improvement, poor, percentiles_75)
                         VALUES ('${metrics[0].density || 0}', '${metrics[1].density || 0}', '${metrics[2].density  || 0}', '${percentiles75}')`)
                     .then(r => r.insertId);

                 OkPacket.push(await queryDB(`INSERT INTO metrics (tracking_date, form_factor_id, histogram_id, url_id, metrics_name_id)
                             VALUES (
                                     ('${util.nowDate()}'),
                                     (SELECT id FROM form_factor WHERE name = '${data.key.formFactor}'),
                                     (${idLatestHistogram}),
                                     (SELECT id FROM url_history WHERE url = '${url}'),
                                     (SELECT id FROM metrics_name WHERE name = '${item}')
                             )
                     `));
                }

                return OkPacket;
            },
    }
}


