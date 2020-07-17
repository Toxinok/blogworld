import data from '../../json/home.js';
import createElement from '../createElement.js';

const section = createElement('section', {id: 'aboutUs', class: 'about-us'});
const container = createElement('div', {class: 'container'});

section.appendChild(container);

const titleBlock = createElement('div', {class: 'about-us__title-block'});
const title = createElement(
  'h2',
  {class: 'about-us__title'},
  data.aboutUs.title,
);
const titleUnderline = createElement('div', {
  class: 'about-us__title-underline',
});
const text = createElement('h4', {class: 'about-us__text'}, data.aboutUs.text);

titleBlock.appendChild(title);
titleBlock.appendChild(titleUnderline);
titleBlock.appendChild(text);
container.appendChild(titleBlock);

const mainBlock = createElement('div', {class: 'about-us__main-block'});
container.appendChild(mainBlock);
const aside = createElement('div', {class: 'about-us__aside aside-pros'});
mainBlock.appendChild(aside);

data.asidePros.forEach((element) => {
  const block = createElement('div', {
    class: `aside-pros__block aside-pros__block--${element.blockColor}`,
  });
  const blockCorner = createElement('span', {
    class: `aside-pros__white-corner aside-pros__white-corner--${element.cutCorner}`,
  });
  const image = createElement('div', {
    class: `aside-pros__image aside-pros__image--${element.image}`,
  });
  const title = createElement(
    'h4',
    {class: 'aside-pros__title'},
    element.title,
  );

  block.appendChild(blockCorner);
  block.appendChild(image);
  block.appendChild(title);

  aside.appendChild(block);
});

const videoWrapper = createElement('div', {class: 'about-us__video-wrapper'});
const video = createElement('video', {
  src: `${data.aboutUs.videoPath}`,
  class: 'about-us__video',
  poster: `${data.aboutUs.videoPoster}`,
  controls: 'controls',
});

videoWrapper.appendChild(video);
mainBlock.appendChild(videoWrapper);

const wrapper = document.getElementById('wrapper');
wrapper.appendChild(section);
