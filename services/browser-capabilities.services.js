const merge = require("deepmerge");


exports.CapabilityOptions = {
    SCREEN_SIZE: "opt:screenSize",
    HEADLESS: "opt:headless",
    MOBILE: "opt:isMobile",
};

exports.BrowserCapabilityService = class BrowserCapabilityService {

    constructor(options, capabilities) {
        ["defaultOptions", "headlessOption", "dimensions"].forEach(o => {
            if (!options[o]) {
                options[o] = {};
            }
        });

        this.options = options;
    }

    onPrepare(config, capabilities) {
        capabilities.forEach(this._processCapability.bind(this));
    }

    async before(capability, spec, browser) {
        if (capability[exports.CapabilityOptions.MOBILE] != true) {
            let dimension = this._getDimension(capability[exports.CapabilityOptions.SCREEN_SIZE]);
            if (dimension) {
                await browser.setWindowSize(dimension.width, dimension.height);
            }
        }
    }

    _processCapability(capability) {
        let browser = capability.browserName;

        let newCapability = merge(capability, this.options.defaultOptions[browser] || {});

        if (newCapability[exports.CapabilityOptions.MOBILE] != true) {
            if (!newCapability[exports.CapabilityOptions.SCREEN_SIZE]) {
                newCapability[exports.CapabilityOptions.SCREEN_SIZE] = "large"
            }

            if (newCapability[exports.CapabilityOptions.HEADLESS]) {
                newCapability = merge(newCapability, this.options.headlessOptions[browser])
            }
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