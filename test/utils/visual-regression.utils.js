let {} = require("./interactions.utils");
module.exports.checkElement = async function (element, tagName, options) {
    if (element["wrappedElement"]) {
        element = element.wrappedElement();
    }
    let result = await browser.checkElement(await element, tagName, options);
    return result < 0.5 ? 0 : result;
}

module.exports.checkFullPageScreen = async function (tagName, options) {
    options = options || {};
    Object.assign(options, {
        hideAfterFirstScroll: [await $("[id='sitenav:topbar']")]
    })
    let result = await browser.checkFullPageScreen(tagName, options);
    return result < 0.5 ? 0 : result;
}