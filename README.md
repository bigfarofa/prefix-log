# prefix-log.js

It's pretty self-explanatory. It's a mini wrapper for the console that adds a prefix for each log.

### General Use
Example:
````javascript
var logger  = require("prefix-log")("[MY LOGGER]");
logger.log("Mama mia"); // ["MY LOGGER"]MAMA MIA
logger.log(555); // ["MY LOGGER"] 555
````

It also accepts the `error` and `warn` methods.
````javascript
logger.error("You will have a bad time");
logger.warn("Being faster than light leaves you in darkness.");
````

### Options
Accepts a function that sets a condtion to log <b>OR</b> a object with options;
- `logWhen <Function>`: Condition to execute the method `log`
- `errorWhen <Function>`: Condition to execute the method `error`
- `warnWhen <Function>`: Condition to execute the method `warn`
- `prefixAsArg <boolean>`: By default, if the first log argument is a `<String>`, the prefix and the `<String>` will be concatenated. With this option set as `true` the prefix will be placed on a separated argument.

### Conditional Logging
If you want to log only when met with a certain condition. You can set a function to validate it.
````javascript
var prefixLog = require("prefix-log");

var devMode = true;
var logger = prefixLog("[DEV LOGGER] ", function(){
  return devMode === true;
})
logger.log("IT WILL PRINT"); // > [DEV LOGGER] IT WILL PRINT
devMode = false;
logger.log("IT WILL NOT PRINT") // *it does not print
````
You can also choose which method needs to match a specific condition:
````javascript
var prefixLog = require("prefix-log");

devMode = false;
var logger = prefixLog("[LOG ONLY IN DEV] ", {
  // This function is called before every "log"
  logWhen: function(){
    return devMode === true;
  },
  // This function is called before every "error"
  errorWhen: function(){
    return true;
  },
  // This function is called before every "warn"
  warnWhen: function(){
    return true;
  }
})
logger.log("IT WILL NOT PRINT"); // *it does not print
logger.error("IT WILL PRINT") // > [LOG ONLY IN DEV] IT WILL PRINT
````

### Force Logging
If you want to force a log you must call the `force` method.

Like this:
````javascript
// With this logger configuration, the logger will never log. Unless we force it.
var logger = require("prefix-log")("[FORCED TEST]", () => false);
logger.log("I WILL PULL A SNEAKY ON YA"); // *It does not print
logger.force().log("GOT EM"); // GOT EM
````

##