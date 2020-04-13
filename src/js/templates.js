import {curry} from './helpers';
import { resetButton, selectionAction, setImage } from './actions';
import {createID, wrapperTemplate} from './helpers';

// Templates
const buttonTemplate = (title, id)=>`<li class="game__buttons-list"><button id="${id}" aria-pressed="false" title="Select ${title}" class="game__button game__button--selection" data-selection="${title}">${title}</button></li>`;

const listTemplate = ({hidden, id, img, title})=>`<li class="game__image-list" id="${id}" aria-hidden="${hidden}" data-image="${title}">${img}</li>`

const imageTemplate = ({path, title})=>`<img src="${path}" class="game__image game__image--bitmap" alt="${title}" />`;

// Get images for action
const findElements = (images)=>{
  const imgs = {...images}; // copy object;
  Object.entries(imgs).forEach(([key, value])=>{  
    const { id } = value;
    const element = document.getElementById(id);
    imgs[key] = {element}
  });

  return imgs;
}

const createButtons = (selections, elId, player)=>{
  const el = document.getElementById(elId);

  const btnIDs = [];
  // Creates buttons
  const buttons = selections.map((selection)=>{
    const btnID = createID(selection, player, 'btn');
    btnIDs.push(btnID);
    return buttonTemplate(selection, btnID);
  });
  // Adds to page
  el.innerHTML = wrapperTemplate(buttons, 'selection');
  // Stores buttons for adding click
  return btnIDs.map((id)=>document.getElementById(id));
}

const createImages = (images, elementId, player)=>{
  const el = document.getElementById(elementId);

  let imageElements = {}
  const imgs = Object.entries(images).map(([title, path], i)=>{
    const id = createID(title, player, 'img');
    imageElements[title] = { id };
    const hidden = i !== 0; // Hides all but first element
    const img = imageTemplate({path, title});
    return listTemplate({hidden, id, img, title});
  });

  el.innerHTML = wrapperTemplate(imgs, 'images-list');
  return findElements(imageElements);
}

export default (state, player)=>{
  const {images, selections} = state;
  const imgs = createImages(images, `${player}-images`, player);
  const buttons = createButtons(selections, `${player}-buttons`, player);

  selectionAction (buttons, imgs, state, player);
  return {
    buttons: resetButton(buttons), // resets buttons after game
    imgs: curry(setImage, imgs), // Sets image if randomised
    player,
    win: document.getElementById(`${player}-win`) // for wins text
  };
}