// polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";
// css
import '../css/index.scss';



import GamePlay from './game_play';

(()=>{
  // Checks if grid available
  var el = document.createElement('div');
  var supportsGrid = typeof el.style.grid === 'string';
  var css = supportsGrid ? 'grid' : 'no-grid'
  document.body.classList.add(css)
})();


(()=>{
  GamePlay();// starts game
})();

