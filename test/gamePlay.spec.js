import { readFileSync } from 'fs';
import { join } from 'path';
import GamePlay from 'js/game_play';

import SimulateClick from './__helpers__/simulate_click.helper';

const html = readFileSync(join(__dirname, './__markup__/index.html'));

const SELECTIONS = ['rock', 'paper', 'scissors'];

const WINS = [
  ['rock', 'scissors', 'rock blunts scissors'], 
  ['scissors', 'paper', 'scissors cuts paper'], 
  ['paper', 'rock', 'paper covers rock']
];

const clickBtn = ({buttons}, selection)=>{
  const button = buttons.find((btn)=>btn.dataset.selection === selection);
  SimulateClick(button, 'click');
}

const checkButtonsReset = (players)=>{
  players.forEach(({buttons})=>{
    buttons.forEach((btn)=>{
      expect(btn).not.toHaveCss('game__button--selected');
    })
  });
}

describe('Tests Game', () => {
  let players, response, submit, version;
  beforeAll(()=>{
    document.body.innerHTML = html;
    GamePlay();
    response = document.getElementById('result');
    submit =  document.getElementById('play');
    version =  document.getElementById('version');
    players = ['player1', 'player2'].map(player=>({
      buttons: [...document.querySelectorAll(`#${player}-buttons button`)],
      images: [...document.querySelectorAll(`#${player}-images li`)],
      player,
      win: document.getElementById(`${player}-win`),
    }));
  });

  describe('test draws', ()=>{
    afterEach(()=>{
      response.innerText = '';
    })

    SELECTIONS.forEach((select, i)=>{
      test(`both players select ${select}`, ()=>{
        players.forEach(({buttons})=>{
          SimulateClick(buttons[i], 'click');
        });
        SimulateClick(submit, 'click');
        expect(response).toHaveTextContent('Draw');

        checkButtonsReset(players);
      });
    });
  });

  describe('player 1 wins', ()=>{
    afterEach(()=>{
      response.innerText = '';
    })


    WINS.forEach(([player1, player2, responseText], i)=>{
      test(`player 1 wins selecting ${player1} against ${player2}`, ()=>{
        // Set selections
        clickBtn(players[0], player1);
        clickBtn(players[1], player2);
        //Start game
        SimulateClick(submit, 'click');
        const { win } = players[0];

        // Checks text response shows
        expect(response).toHaveTextContent(responseText);
        // Checks win increases
        expect(win).toHaveTextContent(i+1);
        // Check buttons reset
        checkButtonsReset(players);
      });
    });
  });

  describe('player 2 wins', ()=>{
    afterEach(()=>{
      response.innerText = '';
    })


    WINS.forEach(([player2, player1, responseText], i)=>{
      test(`player 1 wins selecting ${player1} against ${player2}`, ()=>{
        // Set selections
        clickBtn(players[0], player1);
        clickBtn(players[1], player2);
        //Start game
        SimulateClick(submit, 'click');

        const { win } = players[1];
        // Checks text response shows
        expect(response).toHaveTextContent(responseText);
        // Checks win increases
        expect(win).toHaveTextContent(i+1);
        // Check buttons reset
        checkButtonsReset(players);
      });
    });
  });

  describe('check advanced', () => {
    beforeAll(()=>{
      SimulateClick(version, 'click');
      players = ['player1', 'player2'].map(player=>({
        buttons: [...document.querySelectorAll(`#${player}-buttons button`)],
        images: [...document.querySelectorAll(`#${player}-images li`)],
        player,
        win: document.getElementById(`${player}-win`),
      }));
    });

    test('response text should be empty', ()=>{
      expect(response).toHaveTextContent('');
    });

    test('version button should be set to Default', ()=>{
      expect(version).toHaveTextContent('default');
      expect(version).toHaveAttribute('data-select', 'default');
    });

    test('should set up advanced', ()=>{
      players.forEach(({buttons, images, win})=>{
        expect(buttons).toHaveLength(5);
        expect(images).toHaveLength(5);
        expect(win).toHaveTextContent(0);
      })
    })
  });

   describe('should reset if version clicked again', () => {
    beforeAll(()=>{
      SimulateClick(version, 'click');
      players = ['player1', 'player2'].map(player=>({
        buttons: [...document.querySelectorAll(`#${player}-buttons button`)],
        images: [...document.querySelectorAll(`#${player}-images li`)],
        player,
        win: document.getElementById(`${player}-win`),
      }));
    });

    test('response text should be empty', ()=>{
      expect(response).toHaveTextContent('');
    });

    test('version button should be set to Advanced', ()=>{
      expect(version).toHaveTextContent('advanced');
      expect(version).toHaveAttribute('data-select', 'advanced');
    });

    test('should set up advanced', ()=>{
      players.forEach(({buttons, images, win})=>{
        expect(buttons).toHaveLength(3);
        expect(images).toHaveLength(3);
        expect(win).toHaveTextContent(0);
      })
    })
  })
  
});
