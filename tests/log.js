

var prefixLog = require("../index");

var devMode = true;
var logger = prefixLog("[TEST GLOBAL FUNCTION]", () => process.env.NODE_ENV === true)
logger.log("IT SHOULD PRINT");
devMode = false;
logger.error("IT SHOULD NOT PRINT");
devMode = true;
logger.warn("IT SHOULD PRINT AGAIN");

var loggerError = prefixLog("[TEST ERROR ONLY IN DEV]", {
    errorWhen: () => devMode === true
});

loggerError.error(":error => IT SHOULD PRINT");
devMode = false;
loggerError.error(":error => IT SHOULD NOT PRINT");

loggerError.log(":log => IT SHOULD PRINT");
loggerError.warn(":warn => IT SHOULD PRINT");
devMode = true;
loggerError.error(":error => IT SHOULD PRINT");

var normalLogger = prefixLog("[TEST]");
normalLogger.log("IT SHOULD PRINT");
normalLogger.error("IT SHOULD PRINT");
normalLogger.warn("IT SHOULD PRINT");
