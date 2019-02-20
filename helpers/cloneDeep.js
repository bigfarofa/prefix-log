function cloneObject(obj){
  let x = obj;
  function copyValue(value){
    if (typeof value !== "object") {
      return value;
    } else if (value instanceof Date) {
      return new Date(value);
    } else {
    	return cloneObject(value);
    }
  }

  if(typeof obj === 'object'){
    x = {};
  	if (!Array.isArray(obj)) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          x[key] = copyValue(obj[key]);
        }
      }
    } else {
      x = [];
      for (let i = 0; i < obj.length; i++) {
        x[i] = copyValue(obj[i]);
      }
    }
  }


  return x;

}
module.exports = cloneObject;