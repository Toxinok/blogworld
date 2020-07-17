import data from '../../json/posts.js';
import {aside} from './mainBlock.js';
import createElement from '../createElement.js';

{
  const tags = createElement('div', {class: 'aside__item tags'});

  const title = createElement('h2', {class: 'tags__title'}, data.tags.title);
  tags.appendChild(title);

  data.tags.buttons.forEach((element) => {
    const button = createElement('button', {class: 'button tags__button'}, element);

    tags.appendChild(button);
  });

  aside.appendChild(tags);
}
