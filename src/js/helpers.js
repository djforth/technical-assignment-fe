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

// Quick currying function
export const curry = (fn, ...args) => (fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more));

// Check object has key
export const hasKey = (obj, key)=>Object.prototype.hasOwnProperty.call(obj, key);

// Check element
export const isElement = el => el instanceof Element;

// Checks object and is not empty
export const isFullObject = obj =>
  Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0;

// Mainly for id creation
const stripSpaces = (str)=>str.toLowerCase().replace(' ', '-');

export const createID = (title, player, type)=>`${stripSpaces(title)}-${stripSpaces(player)}-${type}`

export const wrapperTemplate = (items, css)=>`<ul class="game__${css}">${items.join('')}</ul>`;

