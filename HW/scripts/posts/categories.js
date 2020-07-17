import data from '../../json/posts.js';
import {aside} from './mainBlock.js';
import createElement from '../createElement.js';

{
  const categories = createElement('div', {class: 'aside__item categories'});

  const title = createElement('h2', {class: 'categories__title'}, data.categories.title);
  categories.appendChild(title);

  const accordion = createElement('div', {class: 'categories__accordion accordion'});
  categories.appendChild(accordion);

  data.categories.items.forEach((element) => {
    const accordionItem = createElement('div', {class: 'accordion__item'});

    const checkbox = createElement('input', {type: 'radio', name: 'categories', id: `${element.checkboxId}`, class: 'accordion__checkbox'});

    if (element.checked) {
      checkbox.setAttribute('checked', 'checked');
    }

    const label = createElement('label', {for: `${element.checkboxId}`, class: 'accordion__label'});
    const arrow = createElement('span', {class: 'accordion__arrow'});

    label.appendChild(document.createTextNode(element.label));
    label.appendChild(arrow);

    const appearingBlock = createElement('div', {class: 'accordion__appearing-block'});

    element.points.forEach((el) => {
      const item = createElement('h5', {class: 'accordion__appearing-block-item'}, el);

      appearingBlock.appendChild(item);
    });

    accordionItem.appendChild(checkbox);
    accordionItem.appendChild(label);
    accordionItem.appendChild(appearingBlock);

    accordion.appendChild(accordionItem);
  });

  aside.appendChild(categories);
}
