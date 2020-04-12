import {RandomSelect, Winner} from 'js/logic';

// Abstracted tests to keep test suite DRY
const checkWinner = ({title, data, expected})=>{
  describe(title, ()=>{
    let winner;
    const {result, response} = expected;
    beforeAll(()=>{
      winner = Winner(...data);
    });

    test(`result should be ${result}`, ()=>{
      expect(winner.result).toEqual(result);
    });

    test(`response should be '${response}'`, ()=>{
      expect(winner.response).toEqual(response);
    });
  });
}

describe('Test Logic', () => {
  describe('check Winner', () => {
    describe('If incorrect data passed', ()=>{
      test('if player one data incorrect', ()=>{
        const failure = ()=>Winner({}, 'scissors');
        expect(failure).toThrowError('Player data not correct');
      });

      test('if player two data incorrect', ()=>{
        const failure = ()=>Winner({rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }, '');
        expect(failure).toThrowError('Player data not correct');
      });

      test('if player two data incorrect', ()=>{
        const failure = ()=>Winner({rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }, 'spock');
        expect(failure).toThrowError('Player data not correct');
      });
    });

    [{
      title: 'if both select the same',
      data: [{rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }, 'rock'],
      expected: {result: -1, response: 'Draw'}
    },
    {
      title: 'if player 1 wins',
      data: [{rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }, 'scissors'],
      expected: {result: 1, response: 'rock blunts scissors'}
    },
    {
      title: 'if player 2 wins',
      data: [{rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }, 'paper'],
      expected: {result: 0, response: 'paper covers rock'}
    }].forEach(checkWinner);
  });
  
  describe('RandomSelect', () => {
    const selections = ['rock', 'paper', 'scissors'];
    let random;
    beforeAll(()=>{
      random = RandomSelect(selections)
    })

    test('should return function', () => {
      expect(random).toBeFunction()
    });

    test('should return one of the selctions', () => {
      expect(random()).toContainOneOf(selections)
    });
  });
  
});