import data from '../../json/posts.js';
import leftBlock from './mainBlock.js';
import createElement from '../createElement.js';

{
  const reviews = createElement('div', {class: 'reviews'});

  const title = createElement('h2', {class: 'reviews__title'}, data.reviews.title);
  const mainBlock = createElement('div', {class: 'reviews__main-block'});

  reviews.appendChild(title);
  reviews.appendChild(mainBlock);

  data.reviews.items.forEach((element) => {
    const review = createElement('div', {class: 'reviews__item'});

    const image = createElement('span', {class: `reviews__image reviews__image--${element.imageName}`});
    const name = createElement('h4', {class: 'reviews__name'}, element.name);

    const starBlock = createElement('div', {class: 'article__star-block'});

    {
      const full = Math.floor(element.stars);
      for (let i = 0; i < full; i++) {
        const fullStar = createElement('span', {class: 'article__star article__star--full'});

        starBlock.appendChild(fullStar);
      }

      if (element.stars % full !== 0) {
        const halfStar = createElement('span', {class: 'article__star article__star--half'});

        starBlock.appendChild(halfStar);
      }

      const empty = 5 - Math.ceil(element.stars);
      for (let i = 0; i < empty; i++) {
        const emptyStar = createElement('span', {class: 'article__star article__star--empty'});

        starBlock.appendChild(emptyStar);
      }
    }

    const readTimeBlock = createElement('div', {class: 'reviews__readtime-block'});
    const readTimeIcon = createElement('span', {class: 'reviews__readtime-icon'});
    const readTimeText = createElement('h5', {class: 'reviews__readtime-text'}, element.readTime);

    readTimeBlock.appendChild(readTimeIcon);
    readTimeBlock.appendChild(readTimeText);

    const text = createElement('h5', {class: 'reviews__text'}, element.text);

    review.appendChild(image);
    review.appendChild(name);
    review.appendChild(starBlock);
    review.appendChild(readTimeBlock);
    review.appendChild(text);

    if (element.readmore) {
      const readmoreWrapper = createElement('div', {class: 'reviews__readmore-wrapper'});
      const readmore = createElement('a', {href: '#', class: 'reviews__readmore'}, element.readmore);

      readmoreWrapper.appendChild(readmore);
      review.appendChild(readmoreWrapper);
    }

    mainBlock.appendChild(review);
  });

  const buttonWrapper = createElement('div', {class: 'reviews__button-wrapper'});
  const button = createElement('button', {class: 'button reviews__button'}, data.reviews.button);

  buttonWrapper.appendChild(button);
  reviews.appendChild(buttonWrapper);

  leftBlock.appendChild(reviews);
}
