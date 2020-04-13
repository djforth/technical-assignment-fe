import {curry} from './helpers';

//add click handler
const click = (btn, handler)=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    handler(e)
  });
};

// Resets button states
export const resetButton = (buttons)=>()=>{
  buttons.forEach((btn)=>btn.classList.remove('game__button--selected'));
}

// Sets state
const SetState = (state, player, selection)=>{
  state.set(player, 'selected', selection);
}

// Shows correct image;
export const setImage = (imgs, selection)=>{
  const {element: selected} = imgs[selection];
  selected.setAttribute('aria-hidden', false);
  // Reset images
  Object.values(imgs).forEach(({element})=>{
    if(element !== selected) {
      element.setAttribute('aria-hidden', true);
    }
  })
}

// Sets click
const addClick = (setter, reset, imageSet, btn)=>{
  click(btn, ()=>{
    reset();
    setter(btn.dataset.selection);
    imageSet(btn.dataset.selection);
    btn.classList.add('game__button--selected')
  });
}

// Sets up selection buttons for each player
export const selectionAction = (buttons, imgs, state, player)=>{
  const addAction = curry(addClick, curry(SetState, state, player), resetButton(buttons), curry(setImage, imgs))
  buttons.forEach(addAction);
}

// Sets up play button
export const submit = (play)=>{
  const submitBtn = document.getElementById('play');
  click(submitBtn, play);
}

const setItem = (state, {buttons, imgs, player}, selected, no)=>{
  state.set('player1', 'selected', selected); // sets state
  imgs(selected);
  const btn = document.querySelectorAll(`#${player}-buttons button`)[no];
  buttons();
  btn.classList.add('game__button--selected');
}

const setNo = (str)=>{
  const no = parseInt(str) - 1; // off set for array 
  if(no === -1) return 9; // Sets 0 to 9 for advanced game so can use all no.
  return no; 
}

const testLength = (length, no)=>{
  const total = length*2;
  if(total > 9) return no > total;
  return no >= total;
}

// Add keyboard functionality
export const keyboard = (play, state, [player1, player2])=>{
  // Remove any old listeners
  document.body.removeEventListener('keydown', document.body.handler);

  const {selections} = state;
  const setPlayer1 = curry(setItem, state, player1);
  const setPlayer2 = curry(setItem, state, player2);

  const handler = e => {
    if(e.key === 'Enter') play();

    if(/^\d+$/.test(e.key)){
      const no = setNo(e.key);
      const length = selections.length;
      if(testLength(length, no)) return; // Breaks if higher than options or 0
      if(no < length){
        setPlayer1(selections[no], no);
      } else {
        const key = no - length;
        setPlayer2(selections[key], key);
      }
    }
  } 
  document.body.handler = handler; // Bind handler to body for removal on game change
  document.body.addEventListener('keydown', handler);
}