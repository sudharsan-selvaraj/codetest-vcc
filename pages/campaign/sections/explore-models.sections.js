const CarModel = require("../components/car-model.component");
const {isSmallScreen} = require("../../../utils/test.utils");
const {dragAndDrop, scrollIntoView} = require("../../../utils/interactions.utils");

module.exports = class ExploreModels {

    constructor(sectionElement) {
        this.sectionElement = sectionElement;
    }

    /* Locators */
    get carouselPreButton() {
        return $attr("data-autoid", "springCarouselPreviousButton")
    }

    get carouselNextButton() {
        return $attr("data-autoid", "springCarouselPreviousButton")
    }

    getHeading() {
        return $attr("data-autoid", "productListCarousel:title").getText();
    }

    async getTotalModelCount() {
        let models = await $$(`[data-autoid="springCarouselPane:carouselItem"]`);
        return models.length;
    }

    async scrollCarModelIntoView(index, models) {
        let carousel = ".//*[@data-autoid=\"springCarouselPane:carouselItem\"]/..";
        if (!models) {
            models = await this.sectionElement.$$(`[data-autoid="springCarouselPane:carouselItem"]`);
        }
        /* Based on the transform css property we can identify the current cars that are visible in the carousel */
        let transform = await browser.execute(function () {
            let node = document.evaluate(arguments[0], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return node.style.transform;
        }, carousel);

        let currentCarIndex = Math.round(parseInt(transform.match(/([0-9]*)%/)[1]) / 100);
        if (currentCarIndex === index) {
            return;
        }
        let noOfSwipes = Math.abs(currentCarIndex - index);
        let swipeDistance = isSmallScreen() ? 20 : 10;
        if (index > currentCarIndex) {
            swipeDistance = -swipeDistance;
        }
        while (noOfSwipes != 0 && currentCarIndex < models.length) {
            await dragAndDrop(models[currentCarIndex], {x: swipeDistance, y: 0});
            await browser.pause(1000);
            currentCarIndex++;
            noOfSwipes--;
        }
    }

    async getModel(index, bringToView) {
        let models = await this.sectionElement.$$(`[data-autoid="springCarouselPane:carouselItem"]`);
        await scrollIntoView(this.sectionElement);
        if (bringToView) {
            await this.scrollCarModelIntoView(index, models);
        }
        return new CarModel(models[index]);
    }

    wrappedElement() {
        return this.sectionElement;
    }
}