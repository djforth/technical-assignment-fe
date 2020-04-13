// Main methods
import {DEFAULT_CONFIG, ADVANCED_CONFIG} from './config';

import SetupPlayer from './templates';
import CreateOptions from './create_options';
import { State, Play } from './logic';
import { submit } from './actions';

const createGame = (config)=>{
  // get data for setup
  const options = CreateOptions(config);
  // Starts state management
  const state = State(config);
  const players = []
  // Create Player 1
  players.push(SetupPlayer(state, 'player1', options));
  // Create Player 2
  players.push(SetupPlayer(state, 'player2', options));

  const responseText = document.getElementById('result');
  // Reset
  responseText.innerHTML = '';
  players.forEach(({win})=>{
      // Sets wins
      win.innerHTML = 0;
  });

  submit(()=>{
    const {response} = Play(state, options, players);
    responseText.innerHTML = response;
    players.forEach(({buttons, win, player})=>{
      // Sets wins
      win.innerHTML = state.get(player, 'wins');
      // resets button
      buttons();
      // resets state
      state.set(player, 'selected', null);
    });
  });
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