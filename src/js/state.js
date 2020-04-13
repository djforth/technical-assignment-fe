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

  const EXPECTED_KEYS = ['image', 'win'];
  const checker = curry(checkObjectKeys, EXPECTED_KEYS)

  return Object.values(options).reduce((pass, value)=>{
    // If failed return false
    if(!pass) return pass;
    return checker(value);
  }, true);
}

export default (config)=>{
  if(!checkConfig(config)) {
    throw new Error("Config must have 'image', 'win' for each item, please check config");
  }

  // Extracts for config
  const selections = Object.keys(config); //List of available options
  const images =  Object.entries(config).reduce((images, [key, {image}])=>({...images, [key]: image}), {}); // Images for all options

  const state = {
    images,
    player1: { selected: null, wins: 0 },
    player2: { selected: null, wins: 0 },
    selections
  };

  return {
    config,
    get: (player, key)=>{
      if(key) return state[player][key];
      return state[player];
    },
    images,
    selections,
    set(player, key, value) {
      state[player][key] = value;
    },
    win: (player)=>{
      state[player].wins += 1;
    }
  }
}