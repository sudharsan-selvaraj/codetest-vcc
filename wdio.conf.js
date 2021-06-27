const merge = require("deepmerge");
const parseArgs = require("./args-parser");
const {CapabilityOptions} = require("./test/services/browser-capabilities.services");
const sharedConfig = require("./wdio.shared.conf");

/* Default values */
const TEST_ROOT_DIR = "./test/specs";
const ALLOWED_SCREENS = ["large", "medium", "small"],
    ALLOWED_BROWSERS = ["chrome", "firefox", "safari"],
    DEFAULT_SPECS = [`${TEST_ROOT_DIR}/**/*-common.spec.js`];

let capabilities = [],
    /* parse the command line arguments */
    args = parseArgs({
        allowedScreens: ALLOWED_SCREENS,
        allowedBrowsers: ALLOWED_BROWSERS,
        defaultSpecs: DEFAULT_SPECS,
    }, process.argv.splice(2));

/* Dynamically construct the capabilities based on passed CLI parameters */

args.browsers.forEach(function (browser) {
    args.screens.forEach(function (screen) {
        capabilities.push({
            browserName: browser,
            [CapabilityOptions.HEADLESS]: args.headless,
            [CapabilityOptions.SCREEN_SIZE]: screen,
            maxInstances: args.maxInstances,
            specs: merge(args.specs, [`${TEST_ROOT_DIR}/**/*${screen}*screen.spec.js`])
        })
    });
});

args.devices.forEach(function (device) {
    let capability = {
        maxInstances: args.maxInstances,
        [CapabilityOptions.MOBILE]: device[CapabilityOptions.MOBILE] ? device[CapabilityOptions.MOBILE] : true,
        [CapabilityOptions.HEADLESS]: args.headless,
        specs: merge(args.specs, [`${TEST_ROOT_DIR}/**/*${device["opt:screenSize"]}*screen.spec.js`])
    };
    capabilities.push(merge(capability, device))
});

/* Export the newly constructed config object which will be used by wdio runner */
exports.config = merge(sharedConfig.config, {
    capabilities: capabilities
});