const merge = require("deepmerge");

let CapabilityOptions = {
    SCREEN_SIZE: "opt:screenSize",
    HEADLESS: "opt:headless",
    MOBILE: "opt:isMobile",
}

module.exports = class BrowserCapabilityService {

    constructor(options, capabilities) {
        ["defaultOptions", "headlessOption", "dimensions"].forEach(o => {
            if (!options[o]) {
                options[o] = {};
            }
        });

        this.options = options;
    }

    onPrepare(config, capabilities) {
        capabilities.forEach(c => this._processCapability(c));
        console.log(capabilities);
    }

    async before(capability, spec, browser) {
        let dimension = this._getDimension(capability[CapabilityOptions.SCREEN_SIZE]);
        if (dimension) {
            await browser.setWindowSize(dimension.width, dimension.height);
        }
    }

    _processCapability(capability) {
        let browser = capability.browserName;

        if (!capability[SCREEN_SIZE_OPT]) {
            capability[SCREEN_SIZE_OPT] = "large"
        }

        let newCapability = merge(capability, this.options.defaultOptions[browser] || {});
        if (capability[CapabilityOptions.HEADLESS]) {
            newCapability = merge(newCapability, this.options.headlessOptions[browser])
        }
        Object.assign(capability, newCapability);
        return capability;
    }

    _getDimension(screenSize) {
        let {screens} = this.options;

        if (!screens || !screens[screenSize]) {
            return null;
        }

        let [width, height] = screens[screenSize].split("x");
        return {
            width: parseInt(width),
            height: parseInt(height)
        }
    }
}

exports.CapabilityOptions = CapabilityOptions;