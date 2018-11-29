module.exports = function(prefix, opt){
  return {
    log: function(){
      if (typeof opt === 'function') {
        if (!opt()) {
          return false;
        }
      } else if (typeof opt === 'object' && opt.logWhen) {
        if (!opt.logWhen()) {
          return false;
        }
      }
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string') {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.log.apply(null, args);
    },
    error: function(){
      if (typeof opt === 'function') {
        if (!opt()) {
          return false;
        }
      } else if (typeof opt === 'object' && opt.errorWhen) {
        if (!opt.errorWhen()) {
          return false;
        }
      }
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string') {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.error.apply(null, args);
    },
    warn: function(){
      if (typeof opt === 'function') {
        if(!opt()){
          return false;
        }
      } else if (typeof opt === 'object' && opt.warnWhen) {
        if (!opt.warnWhen()) {
          return false;
        }
      }
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === 'string') {
        args[0] = prefix + args[0];
      } else {
        args.splice(0, 0, prefix);
      }
      return console.warn.apply(null, args);
    }
  }
}