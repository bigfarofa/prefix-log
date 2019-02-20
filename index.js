let cloneDeep = require("./helpers/cloneDeep");
module.exports = function(prefix, opt){

  let prefixAsArg = (typeof opt === 'object' && opt.prefixAsArg);
  let methods = {
    log: function(){

      if (opt) {
        if (typeof opt === 'function' && !opt()) {
          return false;
        } else if (typeof opt === 'object' && opt.logWhen) {
          if (!opt.logWhen()) {
            return false;
          }
        }
      }

      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string' && !prefixAsArg) {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.log.apply(null, args);
    },
    error: function(){

      if (opt) {
        if (typeof opt === 'function' && !opt()) {
          return false;
        } else if (typeof opt === 'object' && opt.errorWhen) {
          if (!opt.errorWhen()) {
            return false;
          }
        }
      }

      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string' && !prefixAsArg) {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.error.apply(null, args);
    },
    warn: function(){

      if (opt) {
        if (typeof opt === 'function' && !opt()) {
          return false;
        } else if (typeof opt === 'object' && opt.warnWhen) {
          if (!opt.warnWhen()) {
            return false;
          }
        }
      }

      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string' && !prefixAsArg) {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.warn.apply(null, args);
    },
    force: function(){

      var oldOpt = cloneDeep(opt);
      if (typeof opt === 'object') {
        opt.logWhen = function(){
          return true;
        };
        opt.errorWhen = function(){
          return true;
        };
        opt.warnWhen = function(){
          return true;
        };
      } else {
        opt = null;
      }

      return {
        log: function(){
          var args = Array.prototype.slice.call(arguments);
          methods.log.apply(null, args);
          opt = cloneDeep(oldOpt);
        },
        error: function(){
          var args = Array.prototype.slice.call(arguments);
          methods.error.apply(null, args)
          opt = cloneDeep(oldOpt);
        },
        warn: function(){
          var args = Array.prototype.slice.call(arguments);
          methods.warn.apply(null, args)
          opt = cloneDeep(oldOpt);
        }
      }
    }
  }

  return methods;
}