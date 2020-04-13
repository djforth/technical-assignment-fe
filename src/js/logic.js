import { hasKey } from './helpers';
// Returns display response
const createResponse = (winner, loser, response)=>{
  return `${winner} ${response[loser]} ${loser}`
}

// Returns winner data 
// * win = [{scissors: 'blunts'}]
// * player1 = string ('rock')
// * player2 = string ('paper')
const isWinner = ({win}, { main, opponent, player})=>{
  // See if in win list
  const response = win.find((comb)=>hasKey(comb, opponent));
  if(!response) return false;
  
  return { result: player, response: createResponse(main, opponent, response) };
}

// Random pick from options for computer check
export const RandomSelect = ({selections})=> ()=> {
  const select = Math.floor(Math.random() * selections.length);
  return selections[select]
}

// Returns winner data
// * config - see config.js
// * player1 = string ('paper')
// * player2 = string ('rock')
export const Winner = (config, player1, player2)=> {
  if(player1 === player2) return { result: -1, response: 'Draw'};

  return [
    { main: player1, opponent: player2, player: 0},
    { main: player2, opponent: player1, player: 1}
  ].reduce((result, opts)=>{
    if(result) return result;
    const {main} = opts;
    return isWinner(config[main], opts);
  }, false);
}

const getSelection = ({selected}, random, imgs)=>{
  const select = !selected ? random() : selected;
  imgs(select); // Sets correct image if randomise
  return select;
}

export const Play = (state, playersElements)=>{
  const randomiser = RandomSelect(state);
  const players = playersElements.map(({imgs, player})=>
    getSelection(state.get(player), randomiser, imgs)
  )  
  const win = Winner(state.config, ...players);
  const {result} = win;
  if(result !== -1) {
    state.win(result ? 'player2' : 'player1')
  }
  
  return win;
}