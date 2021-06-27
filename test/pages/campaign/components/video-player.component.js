const Page = require("../../wrappers/page");

module.exports = class VideoPlayer {

    constructor(parent) {
        this.parent = parent;
    }

    async getCurrentTime() {
        return browser.execute(() => {
            return arguments[0].currentTime;
        }, await this._getVideoElement());
    }

    async getSource() {
        return browser.execute(() => {
            return arguments[0].currentSrc;
        }, await this._getVideoElement());
    }

    _getVideoElement() {
        return this.parent.$css("video").wrappedElement();
    }

    async resetAndPause() {
        await browser.execute(function (){
            arguments[0].pause();
            arguments[0].currentTime = 0;
        }, await this._getVideoElement());
    }
}