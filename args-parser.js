const yargs = require("yargs");
const deviceList = require("./deviceConfig.json");

let isArrayContains = function (originalArray, subArray) {
    return subArray.reduce((includes, subArrayVal) => includes && originalArray.includes(subArrayVal), true);
}

module.exports = function (options, args) {
    let {allowedScreens, allowedDevices, allowedBrowsers} = options;
    yargs
        .check(function (argv) {
            if (!isArrayContains(allowedScreens, argv.screens)) {
                throw new Error(`invalid screen size provided. Allowed screens are: ${allowedScreens.join(",")}`)
            } else if (!isArrayContains(Object.keys(allowedDevices), argv.devices)) {
                throw new Error(`invalid device provided. Allowed devices are: ${Object.keys(allowedDevices).join(",")}`)
            } else if (!isArrayContains(Object.keys(allowedBrowsers), argv.browsers)) {
                throw new Error(`invalid browser provided. Allowed browsers are: ${allowedBrowsers.join(",")}`)
            }

            return true;
        });

    let parsedArgs = yargs
        // define args types
        .array("screens")
        .array("browsers")
        .array("devices")
        .boolean("headless")
        //define default values
        .default("browsers", ["chrome"])
        .default("screens", ["large"])
        .default("devices", [])
        .default("specs", DEFAULT_SPECS)
        .default("maxInstances", 1)
        .default("headless", false)
        // parse the CLI options
        .parse(args);

    /**
     * For the provided list of devices, read the config from the json file
     */
    if (parsedArgs.devices.length) {
        parsedArgs.devices.map(d => deviceList[d]);
    }

    return parsedArgs;
}