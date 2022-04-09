module.exports = {
    util: {
        toArray:
            (data) => Array.isArray(data) ? data : [data],
        nowDate:
            () => {
                return new Date().toISOString().slice(0, 10);
                //return new Date('2022-04-07').toISOString().slice(0, 10)
            },
        convertDate:
            (date) => {
                // YYYY-MM-DD
                return new Date(date).toISOString().slice(0, 10);
            },

    }
}
