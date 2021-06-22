/**
 * Page class works as a wrapper of wdio's browser object.
 */
module.exports = class Page {

    async open(url) {
        browser.url(`${url || "/"}`);

        await browser.pause(2000);
        // Accept the cookie popup dialog
        let alertPopup = this.findElement(".optanon-alert-box-bg")
        if (await alertPopup.isDisplayed()) {
            await alertPopup.$css(".optanon-button-allow").click();
        }
    }

    findElement(locator) {
        return $f(locator);
    }

    async findElements(locator) {
        return $$(locator);
    }

    async findReactElement(locator) {
        return react$(locator);
    }

    async findReactElements(locator) {
        return react$$(locator);
    }
}