import {curry} from './helpers';
import { checkObjectKeys, hasKey, isFullObject } from './helpers';

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

// Creates options for win/lose options HOF
const createOption = (converter, config)=>{
  if(Array.isArray(config)) {
    return config.reduce((opts, conf)=>({...opts, ...converter(conf)}), {});
  }

  return converter(config);
}

// Create the options
const createOptions = (name, config)=>{
  const {win, lose} = config[name];
  // Sets losing options to pass into createOption
  const response = curry(GetResponse, name);
  const losingOptions = curry(LoseOption, config, response);

  return { 
    [name]: null, // Sets same to null (draw)
    ...createOption(winOption, win), // Sets winning options
    ...createOption(losingOptions, lose), // Sets losing options
  }
}

// returns images
const getImages = (options)=>
  Object.entries(options).reduce((images, [key, {image}])=>({...images, [key]: image}), {})

// Returns response for lose options, returns from the option
const GetResponse = (title, {win: options})=>{
  let response = options; // if not array
  // loops over win if array to return the correct option
  if(Array.isArray(options)) {
    response = options.find((opt)=>hasKey(opt, title))
  }
  // Returns correct response
  return response[title];
}

// Create Lose options [win = 0, response = string]
const LoseOption = (opts, getResponse, title)=>{
   if(!Object.prototype.hasOwnProperty.call(opts, title)){
    throw new Error(`No response for ${title}, please check config`)
  }

  const options = opts[title]
  return {[title]: [0, getResponse(options)]}
}

// Creates a win option [win = 1, response = string]
const winOption = (win)=>{
  const [[key, value]] = Object.entries(win);
  return {[key]: [1, value]}
}

export default (options)=>{
  if(!checkConfig(options)) {
    throw new Error("Config must have 'image', 'win', 'lose' for each item, please check config");
  }
  
  const selections = Object.keys(options);
  const combinations = selections.map((key)=>createOptions(key, options));
  const images = getImages(options);

  return {combinations, images, selections};
}