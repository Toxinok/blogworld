import data from '../../json/home.js';
import createElement from '../createElement.js';
import Slider from '../slider.js';

const section = createElement('section', {
  id: 'portfolio',
  class: 'portfolio',
});
const container = createElement('div', {class: 'container'});

section.appendChild(container);

const titleBlock = createElement('div', {class: 'portfolio__title-block'});
const title = createElement(
  'h2',
  {class: 'portfolio__title'},
  data.portfolio.title,
);
const titleUnderline = createElement('div', {
  class: 'portfolio__title-underline',
});
const text = createElement(
  'h4',
  {class: 'portfolio__text'},
  data.portfolio.text,
);

titleBlock.appendChild(title);
titleBlock.appendChild(titleUnderline);
titleBlock.appendChild(text);
container.appendChild(titleBlock);

const mainBlock = createElement('div', {class: 'portfolio__main-block'});
container.appendChild(mainBlock);
let widthMainBlock = 0;

data.siteCard.forEach((element) => {
  const siteCard = createElement('a', {
    href: '#',
    class: 'portfolio__site-card site-card',
  });
  siteCard.style.background = `url(${element.image}) no-repeat center`;

  const titleBlock = createElement('div', {
    class: 'site-card__title-block',
  });
  const title = createElement('h3', {class: 'site-card__title'}, element.title);
  const text = createElement('h5', {class: 'site-card__text'}, element.text);

  titleBlock.append(title, text);

  const cornerBlock = createElement('div', {
    class: 'site-card__corner-block',
  });
  const iconLink = createElement('span', {class: 'site-card__icon-link'});
  const iconEnlarge = createElement('span', {
    class: 'site-card__icon-enlarge',
  });

  cornerBlock.append(iconLink, iconEnlarge);

  siteCard.append(titleBlock, cornerBlock);

  widthMainBlock += 400;
  mainBlock.appendChild(siteCard);
});

const buttonBlock = createElement('div', {
  class: 'portfolio__button-block',
});
const leftArrow = createElement('button', {
  class: 'button button--left-arrow',
});
const rightArrow = createElement('button', {
  class: 'button button--right-arrow',
});

buttonBlock.append(leftArrow, rightArrow);

container.appendChild(buttonBlock);

const marginMainBlock = -420;

if (mainBlock.childElementCount === 3) {
  const clnLast = mainBlock.lastChild.cloneNode(true);
  const clnFirst = mainBlock.firstChild.cloneNode(true);
  widthMainBlock += 800;
  mainBlock.prepend(clnLast, clnFirst);
}

mainBlock.style.width = `${widthMainBlock}px`;

function SliderTransition(element, marginLeftVar) {
  Slider.apply(this, arguments);

  this.sliderRight = function() {
    element.style.marginLeft = `${(marginLeftVar -= 400)}px`;

    setTimeout(() => {
      element.classList.remove('transition');
      element.appendChild(element.firstChild);
      element.style.marginLeft = `${(marginLeftVar += 400)}px`;
    }, 1000);

    element.classList.add('transition');
  };

  this.sliderLeft = function() {
    element.style.marginLeft = `${(marginLeftVar += 400)}px`;

    setTimeout(() => {
      element.classList.remove('transition');
      element.prepend(element.lastChild);
      element.style.marginLeft = `${(marginLeftVar -= 400)}px`;
    }, 1000);

    element.classList.add('transition');
  };

  this.sliderDrag = function(section) {
    let startPosition;
    section.addEventListener('dragstart', (event) => {
      startPosition = event.pageX;
    });

    section.addEventListener('dragend', (event) => {
      if (startPosition - 200 > event.pageX) {
        this.sliderRight(mainBlock, marginMainBlock);
      } else if (startPosition + 200 < event.pageX) {
        this.sliderLeft(mainBlock, marginMainBlock);
      }
    });
  };
}

const slider = new SliderTransition(mainBlock, marginMainBlock);
slider.controlsSlider(leftArrow, rightArrow);
slider.autoSlide(buttonBlock);
slider.sliderDrag(section);

const buttonAllWrapper = createElement('div', {
  class: 'portfolio__button-all-wrapper',
});
const buttonAll = createElement(
  'button',
  {class: 'button portfolio__button-all'},
  data.portfolio.buttonAll,
);

buttonAllWrapper.appendChild(buttonAll);

container.appendChild(buttonAllWrapper);

const wrapper = document.getElementById('wrapper');
wrapper.appendChild(section);
