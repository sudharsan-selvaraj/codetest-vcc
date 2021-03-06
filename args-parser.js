const yargs = require("yargs");
const deviceList = require("./device-config.json");

let isArrayContains = function (originalArray, subArray) {
    return subArray.reduce((includes, subArrayVal) => includes && originalArray.includes(subArrayVal), true);
}

module.exports = function (options, args) {
    let {allowedScreens, defaultSpecs, allowedBrowsers} = options;
    yargs
        .check(function (argv) {
            if (!isArrayContains(allowedScreens, argv.screens)) {
                throw new Error(`invalid screen size provided. Allowed screens are: ${allowedScreens.join(",")}`)
            } else if (!isArrayContains(Object.keys(deviceList), argv.devices)) {
                throw new Error(`invalid device provided. Allowed devices are: ${Object.keys(deviceList).join(",")}`)
            } else if (!isArrayContains(allowedBrowsers, argv.browsers)) {
                throw new Error(`invalid browser provided. Allowed browsers are: ${allowedBrowsers.join(",")}`)
            }

            return true;
        });

    ["browsers", "screens", "devices"]
        .forEach(function (k) {
            if (args[k] && args[k].length == 1 && args[0].includes(",")) {
                args[k] = args[0].split(",")
            }
        })

    let parsedArgs = yargs
        // define args types
        .array("screens")
        .array("browsers")
        .array("devices")
        .boolean("headless")
        //define default values
        .default("browsers", [])
        .default("screens", [])
        .default("devices", [])
        .default("specs", defaultSpecs)
        .default("maxInstances", 1)
        .default("headless", false)
        // parse the CLI options
        .parse(args);

    /**
     * For the provided list of devices, read the config from the json file
     */
    if (parsedArgs.devices.length) {
        parsedArgs.devices = parsedArgs.devices.map(d => deviceList[d]);
    }

    return parsedArgs;
}