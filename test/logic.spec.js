import {RandomSelect, Play} from 'js/logic';
import {DEFAULT_CONFIG} from 'js/config';

const State = jest.fn((player1 = null, player2 = null)=>{
  const state = {
    player1: { selected: player1, wins: 0 },
    player2: { selected: player2, wins: 0 }  
  }

  return {
    config: DEFAULT_CONFIG, 
    get: jest.fn((player, key)=>{
      if(key) return state[player][key];
      return state[player];
    }),
    selections:['rock', 'paper', 'scissors'],
    set: jest.fn((player, key, value)=>{
      state[player][key] = value;
    }),
    win: jest.fn((player)=>{
      state[player].wins += 1;
    })
  }
});

// Abstracted tests to keep test suite DRY
const checkWinner = ({title, data: [player1, player2], expected})=>{
  describe(title, ()=>{
    let winner;
    const {result, response} = expected;
    beforeAll(()=>{
      const playersElements = [{
        imgs: jest.fn(),
        player: 'player1'
      }, 
      {
        imgs: jest.fn(),
        player: 'player2'
      }];

      const state = State(player1, player2);

      winner = Play(state, playersElements);
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
    [
      {
      title: 'if both select the same',
      data: ['rock', 'rock'],
      expected: {result: -1, response: 'Draw'}
    },
    {
      title: 'if player 1 wins',
      data: ['rock', 'scissors'],
      expected: {result: 0, response: 'rock blunts scissors'}
    },
    {
      title: 'if player 2 wins',
      data: ['rock', 'paper'],
      expected: {result: 1, response: 'paper covers rock'}
    }].forEach(checkWinner);
  });
  
  describe('check random', () => {
    let winner;
    beforeAll(()=>{
      const playersElements = [{
        imgs: jest.fn(),
        player: 'player1'
      }, 
      {
        imgs: jest.fn(),
        player: 'player2'
      }];
      const selections = ['rock', 'paper', 'scissors']
      const state = State();

      winner = Play(state, playersElements);
    });

    test(`result should be valid`, ()=>{
      expect(winner.result).toEqual(expect.any(Number));
    });

    test(`response should be valid`, ()=>{
      expect(winner.response).toEqual(expect.any(String));
    });
  });

  describe('Play logic', () => {
    
  })
  
  
});