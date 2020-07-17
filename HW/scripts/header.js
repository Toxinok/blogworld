import data from '../json/general.js';
import createElement from './createElement.js';
export {header as default};

let header;

{
  header = createElement('header', {class: 'header'});

  const companyName = createElement('div', {class: 'header__company-name'});
  const companyNameText = createElement(
    'h4',
    {class: 'header__company-name-text'},
    data.header.companyName,
  );

  companyName.appendChild(companyNameText);
  header.appendChild(companyName);

  const menu = createElement('nav', {class: 'header__menu menu'});

  data.header.menu.forEach((element) => {
    const menuItem = createElement('a', {
      href: `${element.href}`,
      class: 'menu__item',
    });
    const menuItemText = createElement(
      'h5',
      {class: 'menu__item-text'},
      element.name,
    );

    menuItem.appendChild(menuItemText);
    menu.appendChild(menuItem);
  });

  header.appendChild(menu);

  const button = createElement('a', {href: 'postForm.html', class: 'button'}, data.header.button);
  header.appendChild(button);
}
