module.exports = {
    util: {
        toArray:
            (data) => Array.isArray(data) ? data : [data],
        nowDate:
            () => new Date().toISOString().slice(0, 10),

    }
}
