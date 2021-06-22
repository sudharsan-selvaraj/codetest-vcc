const BasePage = require("./wrappers/basepage");
const VideoPlayer = require("./component/video-player.component");

const {click, getAttribute, getHexColor, scrollIntoView, mouseHover} = require("../utils/interactions.utils");

/**
 * Class representing the pageobject of Campaign page.
 */
class CampaignPage extends BasePage {

    constructor() {
        super();
    }

    /* Sections */
    get userVideoSection() {
        return new UserVideoSection($id("Video-1"));
    }

    get CalloutsSection() {
        return new CalloutsSection($id("IconCallouts-1"));
    }

    /* PageObject methods */

    async open() {
        await super.open("v/car-safety/a-million-more");
    }

}


class CalloutsSection {

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
            await mouseHover(this.learnAboutCarsElement);
            await browser.pause(1000);
        }

        return getHexColor(this.learnAboutCarsElement);
    }
}

/**
 * Class representing the User story video container in the
 * campaign page
 */
class UserVideoSection {

    constructor(sectionElement) {
        this.sectionElement = sectionElement;
    }

    /**
     * Video element
     * @returns {VideoPlayer}
     */
    get introVideo() {
        return new VideoPlayer(this.sectionElement);
    }

    /**
     * Watch story button that is displayed over the video element.
     * @returns {FluentElement}
     */
    get watchStoryButton() {
        return this.sectionElement.$buttonContainingText("watch the story");
    }

    isWatchStoryButtonPresent() {
        return this.watchStoryButton.isDisplayed()
    }

    /**
     * Returns the current time from the HTML5 video player element
     *
     * @returns {Promise<number>}
     */
    getCurrentTime() {
        return this.introVideo.getCurrentTime();
    }

    /**
     * Returns the src attribute from the HTML5 video player element
     *
     * @returns {Promise<string>}
     */
    getVideoSource() {
        return this.introVideo.getSource();
    }

    clickWatchStory() {
        return click(this.watchStoryButton);
    }

    checkYoutubePlayerDisplayed() {
        return this.sectionElement.$css("iframe").isDisplayed();
    }

    /**
     * Returns the value of src attribute for the embeded youtube iframe element.
     * @returns {Promise<string>}
     */
    getYoutubeVideoUrl() {
        return getAttribute(this.sectionElement.$css("iframe"), "src")
    }
}

module.exports = new CampaignPage();