const merge = require("deepmerge");
const parseArgs = require("./args-parser");
const {CapabilityOptions} = require("./services/browser-capabilities.services");
const sharedConfig = require("./volvo.shared.wdio.conf");

const TEST_ROOT_DIR = "./specs";

const ALLOWED_SCREENS = ["large", "medium", "small"],
    ALLOWED_BROWSERS = ["chrome", "firefox", "safari"],
    DEFAULT_SPECS = [`${TEST_ROOT_DIR}/**/*-common.spec.js`, `${TEST_ROOT_DIR}/**/*-visual.spec.js`];

let capabilities = [],
    args = parseArgs({
        allowedScreens: ALLOWED_SCREENS,
        allowedBrowsers: ALLOWED_BROWSERS,
        defaultSpecs: DEFAULT_SPECS,
    }, process.argv.splice(2));

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

exports.config = merge(sharedConfig.config, {
    capabilities: capabilities
});