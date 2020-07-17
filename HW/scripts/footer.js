import data from '../json/general.js';
import createElement from './createElement.js';
export {footer as default};

let footer;

{
  footer = createElement('footer', {class: 'footer'});
  const container = createElement('div', {class: 'container'});

  footer.appendChild(container);

  const mainBlock = createElement('div', {class: 'footer__main-block'});
  container.appendChild(mainBlock);

  const links = createElement('div', {class: 'footer__links'});

  data.footer.links.forEach((element) => {
    const link = createElement('a', {
      href: '#',
      class: `footer__link footer__link--${element}`,
    });

    links.appendChild(link);
  });

  const companyName = createElement(
    'h4',
    {class: 'footer__company-name'},
    data.footer.companyName,
  );
  const rights = createElement(
    'h5',
    {class: 'footer__rights'},
    data.footer.rights,
  );
  const scrollTop = createElement('a', {
    href: '#wrapper',
    class: 'footer__scroll-top',
  });

  mainBlock.appendChild(links);
  mainBlock.appendChild(companyName);
  mainBlock.appendChild(rights);
  mainBlock.appendChild(scrollTop);
}
