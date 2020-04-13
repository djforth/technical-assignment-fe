import {curry} from './helpers';
import { checkObjectKeys, isFullObject } from './helpers';

// checks the config is valid
const checkConfig = (options)=>{
  // Checks object
  if(!isFullObject(options)) {
    throw new Error('Config not an object, please check config');
  }
  // checks at least 2 options
  if(Object.keys(options).length < 2) {
    throw new Error('Config must have at least 2 options, please check config');
  }

  const EXPECTED_KEYS = ['image', 'win', 'lose'];
  const checker = curry(checkObjectKeys, EXPECTED_KEYS)

  return Object.values(options).reduce((pass, value)=>{
    // If failed return false
    if(!pass) return pass;
    return checker(value);
  }, true);
}

export default (options)=>{
  if(!checkConfig(options)) {
    throw new Error("Config must have 'image', 'win', 'lose' for each item, please check config");
  }
  // Extracts for config
  const selections = Object.keys(options); //List of available options
  const images =  Object.entries(options).reduce((images, [key, {image}])=>({...images, [key]: image}), {}); // Images for all options

  return {images, selections};
}