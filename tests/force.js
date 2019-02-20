var logger = require("../index")("[TEST] ", () => false);
logger.log("IT SHOULD NOT PRINT");
logger.force().log("IT SHOULD PRINT");
logger.log("IT SHOULD NOT PRINT");
var logger2 = require("../index")("[PREFIX AS ARG]", {
  prefixAsArg: false,
  logWhen: () => false,
  errorWhen: () => false,
  warnWhen: () => false,
});
logger2.force().log("IT SHOULD PRINT");
logger2.log("IT SHOULD NOT PRINT");

