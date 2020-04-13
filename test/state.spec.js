import State from 'js/state';
import {DEFAULT_CONFIG, ADVANCED_CONFIG} from 'js/config';

import { defaultOptions, advancedOptions } from './__helpers__/options.helper';

// Abstract tests to keep them DRY
const checkState = function(title, config, expected) {
  describe(`Should create ${title}`, () => {
    let state;
    beforeAll(()=>{
      state = State(config);
    });

    test('should have correct selections', () => {
      expect(state.selections).toEqual(expect.arrayContaining(expected.selections));
    });

    test('should have correct images', () => {
      expect(state.selections).toEqual(expect.arrayContaining(expected.selections));
    });
  });
}

describe('Should create valid options', () => {
  // Checks default options
  checkState('default state', DEFAULT_CONFIG, defaultOptions);
  // Checks advanced options
  checkState('advanced state', ADVANCED_CONFIG, advancedOptions);

  describe('If config is incorrect', () => {
    test('if no config', () => {
      const failure = ()=>State('foo');
      expect(failure).toThrowError('Config not an object, please check config');
    });

    test('if config less then 2', () => {
      const failure = ()=>State({rock: {image:'', win:''}});
      expect(failure).toThrowError('Config must have at least 2 options, please check config');
    });

    test('if config incorrect with item not correct keys', () => {
      const failure = ()=>State({
        rock: {image:'', win:''}, 
        paper: {win:'' },
        scissors: {image:'', win:''}
      });
      // expect(['win'].includes('win')).toBeTruthy();
      expect(failure).toThrowError("Config must have 'image', 'win' for each item, please check config");
    });
  });
});
