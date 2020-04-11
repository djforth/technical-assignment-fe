// Quick currying function
export const curry = (fn, ...args) => (fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more));

// Checks object and is not empty
export const isFullObject = obj =>
  Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0;

export const isFullString = str => typeof str === 'string' && str !== ''

// Checks object keys are correct
export const checkObjectKeys = (expected, object) =>{

  const check =  expected.reduce((pass, key)=>{
      // If failed return false
      if(!pass) return pass;
      // Checks correct keys
      return Object.keys(object).includes(key)
    }, true);



    return check;
}
  
  

