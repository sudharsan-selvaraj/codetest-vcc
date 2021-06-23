const CarModel = require("../components/car-model.component");
const {scrollIntoView, getLocation} = require("../../../utils/interactions.utils");

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

    async getModel(index, bringToView) {
        let models = await this.sectionElement.$$(`[data-autoid="springCarouselPane:carouselItem"]`);
        if (bringToView && index > 0) {
            let location = await getLocation(models[index]);
            await scrollIntoView(models[index]);
        }
        return new CarModel(models[index]);
    }
}