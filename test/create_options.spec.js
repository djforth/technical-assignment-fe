import Options from 'js/create_options';
import {DEFAULT_CONFIG, ADVANCED_CONFIG} from 'js/config';

import { defaultOptions, advancedOptions } from './__helpers__/options.helper';

// Abstract tests to keep them DRY
const checkOptionsOpt = function(title, config, expected) {
  describe(`Should create ${title}`, () => {
    let options;
    beforeAll(()=>{
      options = Options(config);
    });

    test('should have correct selections', () => {
      expect(options.selections).toEqual(expect.arrayContaining(expected.selections));
    });

    // Loops over expected to compare with output
    expected.combinations.forEach((opts, i)=>{
      test(`config should the correct options`, () => {
        
        expect(options.combinations[i]).toEqual(expect.objectContaining(opts));
      });
    })
  });
}

describe('Should create valid options', () => {
  // Checks default options
  checkOptionsOpt('default options', DEFAULT_CONFIG, defaultOptions);
  // Checks advanced options
  checkOptionsOpt('advanced options', ADVANCED_CONFIG, advancedOptions);

  describe('If config is incorrect', () => {
    test('if no config', () => {
      const failure = ()=>Options('foo');
      expect(failure).toThrowError('Config not an object, please check config');
    });

    test('if config less then 2', () => {
      const failure = ()=>Options({rock: {image:'', lose:'', win:''}});
      expect(failure).toThrowError('Config must have at least 2 options, please check config');
    });

    test('if config incorrect with item not correct keys', () => {
      const failure = ()=>Options({
        rock: {image:'', lose:'', win:''}, 
        paper: {image:'', win:'' },
        scissors: {image:'', lose:'', win:''}
      });
      // expect(['win'].includes('win')).toBeTruthy();
      expect(failure).toThrowError("Config must have 'image', 'win', 'lose' for each item, please check config");
    });

    test('if config incorrect, and missing selection', () => {
      const failure = ()=>Options({
        rock: {image:'', lose:'paper', win:{ scissors: 'blunt'}}, 
        scissors: {image:'', lose:'rock', win: {paper: 'cut'}}
      });
      // expect(['win'].includes('win')).toBeTruthy();
      expect(failure).toThrowError('No response for paper, please check config');
    });
  });
});
