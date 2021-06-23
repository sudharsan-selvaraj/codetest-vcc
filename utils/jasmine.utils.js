module.exports.using = function (values, fn) {
    if (values instanceof Function) {
        values = values();
    }

    if (values instanceof Array) {
        values.forEach(function (value, i) {
            fn(value, i);
        });
    }
}