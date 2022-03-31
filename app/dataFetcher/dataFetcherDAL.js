const queryDB = require("../DB");
const moment = require('moment')

module.exports = {
    DB: {
        getTrackingUrl: () => queryDB(`SELECT * FROM tracking_url`),
        saveTrackingUrl: (items, success) => queryDB(
            `INSERT INTO tracking_url (url, last_tracking_date, success) VALUES ?`,
            [items.map(item => [item, new Date().toISOString().slice(0, 19), success])]
        )

    }
}


