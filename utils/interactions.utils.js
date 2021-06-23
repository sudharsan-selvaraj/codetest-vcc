async function click(element) {
    return (await resolveElement(element)).click();
}

async function setValue(element, value) {
    return (await resolveElement(element)).setValue(value);
}

async function addValue(element, value) {
    return (await resolveElement(element)).addValue(value);
}

async function getText(element) {
    return (await resolveElement(element)).getText();
}

async function getAttribute(element, attributeName) {
    return (await resolveElement(element)).getAttribute(attributeName);
}

async function getHexColor(element) {
    let colorObj = await getColor(element);
    return colorObj.parsed.hex;
}

async function getColor(element) {
    return getCssProperty(element, "color");
}

async function getCssProperty(element, property) {
    return (await resolveElement(element)).getCSSProperty(property);
}

async function scrollIntoView(element, ignoreBalance) {
     await (await resolveElement(element)).scrollIntoView();
     if(!ignoreBalance) {
         await browser.execute("window.scrollBy(0, -100);");
     }
}

async function mouseHover(element) {
    return (await resolveElement(element)).moveTo();
}

async function getCurrentUrl() {
    return browser.getUrl();
}

async function dragAndDrop(originElement, destinationElement) {
    return await (await resolveElement(originElement))
        .dragAndDrop(await resolveElement(destinationElement));
}

async function getLocation(originElement) {
    return await (await resolveElement(originElement)).getLocation();
}


/* internal method */
async function resolveElement(element) {
    return element;
}

module.exports = {
    click: click,
    setValue: setValue,
    addValue: addValue,
    getText: getText,
    getAttribute: getAttribute,
    getHexColor: getHexColor,
    getColor: getColor,
    getCssProperty: getCssProperty,
    mouseHover: mouseHover,
    scrollIntoView: scrollIntoView,
    getCurrentUrl: getCurrentUrl,
    dragAndDrop: dragAndDrop,
    getLocation: getLocation,
}