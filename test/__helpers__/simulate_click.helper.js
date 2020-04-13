export default (el, ev) => {
  const event = new Event(ev, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  el.dispatchEvent(event);
};

export const keyboardEvent = (el, ev, options) => {
  const event = new KeyboardEvent(ev, options);

  el.dispatchEvent(event);
};