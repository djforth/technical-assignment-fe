import CreateButtons from 'js/templates/buttons';

const SELECTIONS = ['rock', 'paper', 'scissors']

describe('Test button creation', () => {
  describe('if no element', ()=>{
    test('if player one data incorrect', ()=>{
      const failure = ()=>CreateButtons(SELECTIONS, 'fail', 'player 1');
      expect(failure).toThrowError("Can't find element for player 1");
    });
  });

  describe('If element present', () => {
    let buttons, ids;
    beforeAll(()=>{
      document.body.innerHTML = "<div id='player1'></div>";

      ids = CreateButtons(SELECTIONS, 'player1', 'player 1');

      buttons = ids.map((id)=>document.getElementById(id));
    });

    test('should create ul & li\'s for buttons', () => {
      const list = document.querySelector('.game__selection');
      expect(list).toBeElement('UL');
      const items = [...list.querySelectorAll('.game__buttons-list')];

      expect(items).toHaveLength(3);

      items.forEach((item)=>{
        expect(item).toBeElement('LI');
      })
    });

    SELECTIONS.forEach((selection, i)=>{
      test(`should have ${selection} button`, () => {

        const btn = buttons[i];
        expect(btn).toBeElement('BUTTON');
        expect(btn).toHaveTextContent(selection);
        expect(btn).toHaveAttribute('id', ids[i]);
        expect(btn).toHaveAttribute('data-selection', selection);
      });
    })
  });
});