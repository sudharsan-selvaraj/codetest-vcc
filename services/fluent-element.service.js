let elementMethods = [
    "$$",
    "$",
    "addValue",
    "clearValue",
    "click",
    "custom$$",
    "custom$",
    "doubleClick",
    "dragAndDrop",
    "getAttribute",
    "getCSSProperty",
    "getComputedLabel",
    "getComputedRole",
    "getHTML",
    "getLocation",
    "getProperty",
    "getSize",
    "getTagName",
    "getText",
    "getValue",
    "isClickable",
    "isDisplayed",
    "isDisplayedInViewport",
    "isEnabled",
    "isEqual",
    "isExisting",
    "isFocused",
    "isSelected",
    "moveTo",
    "nextElement",
    "parentElement",
    "previousElement",
    "react$$",
    "react$",
    "saveScreenshot",
    "scrollIntoView",
    "selectByAttribute",
    "selectByIndex",
    "selectByVisibleText",
    "setValue",
    "shadow$$",
    "shadow$",
    "touchAction",
    "waitForClickable",
    "waitForDisplayed",
    "waitForEnabled",
    "waitForExist",
    "waitUntil"
];

class FluentElement {

    constructor(locator, searchContext) {
        this.locator = locator;
        this.searchContext = searchContext || browser;
        let self = this;

        elementMethods.forEach(m => {
            if (!self[m]) {
                self[m] = async function () {
                    var searchContext = await self.wrappedElement();
                    return searchContext[m](...arguments);
                }
            }
        });
    }

    $(locator) {
        return new FluentElement(locator, this);
    }

    $css(locator) {
        return new FluentElement(locator, this);
    }

    $id(locator) {
        return new FluentElement(`#${locator}`, this);
    }

    $xpath(locator) {
        return new FluentElement(locator, this);
    }

    $name(attribute, value) {
        return new FluentElement(`[name="${value}"]`, this);
    }

    $attr(attribute, value) {
        return new FluentElement(`[${attribute}="${value}"]`, this);
    }

    $cssContainingText(css, value) {
        return new FluentElement(`${css}*=${value}`, this);
    }

    $buttonContainingText(value) {
        return new FluentElement(`button=${value}`, this);
    }

    async wrappedElement() {
        var sc = this.searchContext;
        if (this.searchContext["wrappedElement"] && typeof this.searchContext["wrappedElement"] === "function") {
            sc = await this.searchContext.wrappedElement();
        }
        return sc.$(this.locator);
    }

}

module.exports = class FluentElementService {

    constructor(serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    before(config, capabilities, browser) {
        ["$f", "$css", "$id", "$xpath", "$attr", "$name"]
            .forEach(m => {

                browser[m] = global[m] = FluentElement.prototype[m === "$f" ? "$" : m].bind(browser);
            });
    }

}