const { getHexColor, scrollIntoView, mouseHover} = require("../../../utils/interactions.utils");

module.exports = class CalloutsSection {

    constructor(sectionElement) {
        this.sectionElement = sectionElement;
        this.learnAboutCarsElement = this.sectionElement.$cssContainingText("a", "Learn more about car safety");
    }

    isLearnAboutCarSafetyDisplayed() {
        return this.learnAboutCarsElement.isDisplayed();
    }

    async getLearnAboutCarLinkColor(hover) {
        await scrollIntoView(this.learnAboutCarsElement);
        if (hover) {
            await browser.pause(1000);
            await mouseHover(this.learnAboutCarsElement);
            await browser.pause(1000);
        }

        return getHexColor(this.learnAboutCarsElement);
    }
}