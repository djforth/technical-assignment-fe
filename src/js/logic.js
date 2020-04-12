import { hasKey, isFullObject, isFullString } from './helpers';

// Checks valid data
const checkData = (player1, player2)=>isFullObject(player1) && isFullString(player2) && hasKey(player1, player2);

// Returns display response
const createResponse = (winner, loser, response)=>{
  return `${winner} ${response} ${loser}`
}

// Gets name of player 1 selection from object
// data like so {rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }
const getPlayer1 = (player1)=>{
  return Object.entries(player1).reduce((name, [key, value])=>{
    if(value === null) return key;
    return name;
  }, '')
}

// Returns winner data 
// * options data like so {rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }
// * player1 = string ('rock')
// * player2 = string ('paper')
const getWinner = (options, player1, player2)=>{
  // Null means same selection so draw
  if(options === null) return { result: -1, response: 'Draw'}

  const [result, response] = options;

  // Player 1 wins
  if(result === 1) return { result, response: createResponse(player1, player2, response) };
  
  // Player 2 wins
  return { result, response: createResponse(player2, player1, response) };
}

// Random pick from options for computer check
export const RandomSelect = (selections)=> ()=> {
  const select = Math.floor(Math.random() * selections.length);
  return selections[select]
}

// Returns winner data
// * player1 data like so {rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] }
// * player2 = string ('paper')
export const Winner = (player1, player2)=> {
  // Checks data is correct
  if(!checkData(player1, player2)) {
    throw(new Error('Player data not correct'));
  }

  const player1Name = getPlayer1(player1);
  return getWinner(player1[player2], player1Name, player2)
}