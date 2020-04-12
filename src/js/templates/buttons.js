import {isElement} from '../helpers';

const buttonTemplate = (title, id)=>`<li class="game__buttons-list"><button id="${id}" aria-pressed="false" class="game__button game__button--selection" data-selection="${title}">${title}</button></li>`;

const wrapperTemplate = (buttons)=>`<ul class="game__selection">${buttons.join('')}</ul>`;

const stripSpaces = (str)=>str.replace(' ', '-')

const createID = (title, player)=>`${stripSpaces(title)}-${stripSpaces(player)}`

export default (selections, id, player)=>{
  const el = document.getElementById(id);

  if(!isElement(el)){
    throw new Error(`Can't find element for ${player}`);
  }

  const btnIDs = []

  const buttons = selections.map((selection)=>{
    const btnID = createID(selection, player);
    btnIDs.push(btnID);
    return buttonTemplate(selection, btnID);
  });

  el.innerHTML = wrapperTemplate(buttons);
  return btnIDs;
}