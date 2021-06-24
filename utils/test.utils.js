const { CapabilityOptions } = require("../services/browser-capabilities.services");

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

module.exports.isExecutedOnMobile = function () {
    let capability = browser.rawCapability ? browser.rawCapability : browser.capabilities;
    return capability[CapabilityOptions.MOBILE] != "false";
}

module.exports.isSmallScreen = function () {
    return browser.rawCapability[CapabilityOptions.SCREEN_SIZE] == "small";
}