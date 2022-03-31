const readFromDB = require("../DB");

module.exports = {
    DB: {
        getTrackingUrl: () => readFromDB(`SELECT * FROM tracking_url`)
    }
}


