const FluentElementService = require("./services/fluent-element.service");
const {TimelineService} = require('wdio-timeline-reporter/timeline-service');
const TimelineReporter = require('wdio-timeline-reporter').default;
const {BrowserCapabilityService, CapabilityOptions} = require("./services/browser-capabilities.services");

exports.config = {

    runner: 'local',

    hostname: 'localhost',

    port: 4444,

    path: '/wd/hub',

    specs: [
        './test/specs/**/*.js'
    ],

    logLevel: 'error',

    baseUrl: 'https://www.volvocars.com/intl/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: [
        [FluentElementService],
        [TimelineService],
        [BrowserCapabilityService, {
            headlessOptions: {
                "chrome": {
                    "goog:chromeOptions": {
                        args: ["--headless"]
                    }
                },
                "firefox": {
                    "moz:firefoxOptions": {
                        args: ["--headless"]
                    }
                }
            },
            screens: {
                "large": "1792x1097", //mac book pro
                "medium": "1024x1366", //ipad pro
                "small": "375x667", //iphone 6
            }
        }]
    ],

    framework: 'jasmine',

    reporters: [
        ['timeline', {
            outputDir: './report',
            screenshotStrategy: "on:dsfsdf",
            embedImages: true
        }],
        'spec'
    ],

    before: (capability, specs) => {
        afterEach(function () {
            TimelineReporter.addContext({
                title: "screen-size",
                value: capability[CapabilityOptions.SCREEN_SIZE]
            });
        });
    },

    jasmineOpts: {
        defaultTimeoutInterval: 60000,
    }
}
