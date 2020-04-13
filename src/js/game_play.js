// Main methods
import {DEFAULT_CONFIG, ADVANCED_CONFIG} from './config';

import SetupPlayer from './templates';
import State from './state';
import { Play } from './logic';
import { submit, keyboard } from './actions';

const createGame = (config)=>{
  // Starts state management
  const state = State(config);
  const players = []
  // Create Player 1
  players.push(SetupPlayer(state, 'player1'));
  // Create Player 2
  players.push(SetupPlayer(state, 'player2'));

  const responseText = document.getElementById('result');
  // Reset
  responseText.innerHTML = '';
  players.forEach(({win})=>{
      // Sets wins
      win.innerHTML = 0;
  });

  const playGame = ()=>{
    const {response} = Play(state, players);
    responseText.innerHTML = response;
    players.forEach(({buttons, win, player})=>{
      // Sets wins
      win.innerHTML = state.get(player, 'wins');
      // resets button
      buttons();
      // resets state
      state.set(player, 'selected', null);
    });
  }

  submit(playGame);
  keyboard(playGame, state, players);
}

export default ()=>{
  createGame(DEFAULT_CONFIG);

  const changeBtn = document.getElementById('version');
  changeBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const version = changeBtn.dataset.select;
    const config = version === 'advanced' ? ADVANCED_CONFIG : DEFAULT_CONFIG;
    createGame(config);
    const update = version === 'advanced' ? 'default' : 'advanced';

    changeBtn.dataset.select = update;
    changeBtn.innerHTML = update;
  })
}