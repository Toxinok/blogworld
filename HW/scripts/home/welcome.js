import data from '../../json/home.js';
import header from '../header.js';
import createElement from '../createElement.js';

$('body').modalWindow({
  type: 'info',
  appendTo: 'body',
  message: 'Subscribe to our blog and be first to know about updates',
  buttonsNumber: 1,
});

{
  const section = createElement('section', {id: 'welcome', class: 'welcome'});
  const container = createElement('div', {class: 'container'});

  section.appendChild(container);
  container.appendChild(header);

  const title = createElement(
    'h1',
    {class: 'welcome__title'},
    data.welcome.title,
  );
  const text = createElement('h4', {class: 'welcome__text'}, data.welcome.text);
  const button1 = createElement(
    'button',
    {class: 'button button--grey welcome__button--margin'},
    data.welcome.button1,
  );
  const button2 = createElement(
    'button',
    {class: 'button'},
    data.welcome.button2,
  );

  container.appendChild(title);
  container.appendChild(text);
  container.appendChild(button1);
  container.appendChild(button2);

  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(section);
}
