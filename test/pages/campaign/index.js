const BasePage = require("../wrappers/basepage");
const IntroVideoSection = require("./sections/intro-video.section");
const CalloutsSection = require("./sections/callouts.section");

/**
 * Class representing the pageobject of Campaign page.
 */
class CampaignPage extends BasePage {

    constructor() {
        super();
    }

    /* Overridden methods */

    async open() {
        await super.open("v/car-safety/a-million-more");
    }

    /* Sections */

    get IntroVideoSection() {
        return new IntroVideoSection($id("Video-1"));
    }

    get CalloutsSection() {
        return new CalloutsSection($id("IconCallouts-1"));
    }

}

module.exports = new CampaignPage();