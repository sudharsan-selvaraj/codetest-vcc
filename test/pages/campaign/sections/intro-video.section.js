const VideoPlayer = require("../components/video-player.component");
const {click, getAttribute} = require("../../../utils/interactions.utils");

/**
 * Class representing the User story video container in the
 * campaign page
 */
module.exports = class IntroVideoSection {

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

    async resetAndPause() {
        await this.introVideo.resetAndPause();
    }
}