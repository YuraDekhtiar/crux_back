const queryDB = require('../DB');
const {util} = require("../utils");
module.exports = {
    DB: {
        getTrackingUrl:
            () => queryDB(`SELECT * FROM tracking_url`),
        addTrackingUrl:
            (items, success) => queryDB(
                `INSERT INTO tracking_url (url, last_tracking_date, success) VALUES ?
                ON DUPLICATE KEY UPDATE last_tracking_date='${util.nowDate()}', success=${success}`,
                [items.map(item => [item, util.nowDate(), success])]
            ),
        deleteTrackingUrl:
            (items) => (queryDB(`DELETE FROM tracking_url WHERE (id) IN (?)`,
                    [items.map(item => [item])]
                )
            ),
        addHistoryUrl:
            (url) => (queryDB(`INSERT IGNORE INTO url_history (url) VALUES ('${url}')`)),
        saveMetrics:
            async (url, data) => {
                const OkPacket = [];
                let metrics;
                for (const item in data.metrics) {
                    metrics = data.metrics[item].histogram;

                    const idLatestHistogram = await queryDB(`INSERT INTO histogram (good, needs_improvement, poor, percentiles)
                        VALUES ('${metrics[0].good}', '${metrics[1].needs_improvement}', '${metrics[2].poor}', '${data.metrics[item].p75}')`)
                        .then(r => r.insertId);
                    OkPacket.push(await queryDB(`INSERT INTO metrics (tracking_date, form_factor_id, histogram_id, url_id, metrics_name_id)
                            VALUES (
                                    ('${util.nowDate()}'), 
                                    (SELECT id FROM form_factor WHERE name = '${data.formFactor}'),
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


