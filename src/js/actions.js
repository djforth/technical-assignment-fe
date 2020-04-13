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