module.exports = {
    util: {
        toArray:
            (data) => Array.isArray(data) ? data : [data],
        nowDate:
            () => {
                //return new Date().toISOString().slice(0, 10);
                return '2022-04-02'
            },
        convertDate:
            (date) => {
                // YYYY-MM-DD
                return new Date(date).toISOString().slice(0, 10);
            },

    }
}
