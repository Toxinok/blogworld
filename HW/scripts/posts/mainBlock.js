import header from '../header.js';
import createElement from '../createElement.js';
import footer from '../footer.js';

let leftBlock;
let aside;

{
  const container = createElement('div', {class: 'container'});
  const mainBlock = createElement('div', {class: 'main__main-block'});

  leftBlock = createElement('div', {class: 'main__left-block'});
  aside = createElement('aside', {class: 'main__aside aside'});

  mainBlock.appendChild(leftBlock);
  mainBlock.appendChild(aside);

  container.appendChild(header);
  container.appendChild(mainBlock);

  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(container);
  wrapper.appendChild(footer);
}

export default leftBlock;
export {aside};
