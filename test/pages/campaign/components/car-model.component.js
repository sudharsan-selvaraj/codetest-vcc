const {getText, getAttribute} = require("../../../utils/interactions.utils");
const {FluentElement} = require("../../../services/fluent-element.service");
module.exports = class CarModel {

    constructor(parentElement) {
        if(!parentElement["wrappedElement"]) {
            parentElement = new FluentElement(null, parentElement)
        }
        this.parentElement = parentElement;
        this.categoryEle = parentElement.$attr("data-autoid", "productListCarouselItem:category");
        this.modelNameEle = parentElement.$attr("data-autoid", "productListCarouselItem:modelName");
        this.rechargeTypeEle = parentElement.$attr("data-autoid", "productListCarouselItem:rechargeType");
        this.learnLink = parentElement.$attr("data-autoid", "productListCarouselItem:link1");
        this.shopLink = parentElement.$attr("data-autoid", "productListCarouselItem:link2");
    }

    categoryName() {
        return getText(this.categoryEle);
    }

    modelName() {
        return getText(this.modelNameEle);
    }

    rechargeType() {
        return getText(this.rechargeTypeEle)
    }

    getImgSrc() {
        return getAttribute(this.parentElement.$css("img"), "src");
    }

}