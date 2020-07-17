import data from '../../json/home.js';
import createElement from '../createElement.js';
import Slider from '../slider.js';

{
  const section = createElement('section', {id: 'testimonials', class: 'testimonials'});
  const container = createElement('div', {class: 'container'});

  section.appendChild(container);

  const titleBlock = createElement('div', {class: 'testimonials__title-block'});
  const title = createElement('h2', {class: 'testimonials__title'}, data.testimonials.title);
  const titleUnderline = createElement('div', {class: 'testimonials__title-underline'});

  titleBlock.appendChild(title);
  titleBlock.appendChild(titleUnderline);

  container.appendChild(titleBlock);

  const mainBlock = createElement('div', {class: 'testimonials__main-block'});
  container.appendChild(mainBlock);

  const leftArrow = createElement('button', {class: 'button button--left-arrow'});
  mainBlock.appendChild(leftArrow);

  let counter = false;
  const userReviews = [];

  data.userReview.forEach((element) => {
    const userReview = createElement('div', {class: 'testimonials__user-review user-review fade'});

    const leftBlock = createElement('div', {class: 'user-review__left-block'});

    const textBlock = createElement('div', {class: 'user-review__text-block'});
    const quote = createElement('h4', {class: 'user-review__quote'}, element.quote);
    const name = createElement('h5', {class: 'user-review__name'}, element.name);
    const position = createElement('h5', {class: 'user-review__position'}, element.position);

    textBlock.appendChild(quote);
    textBlock.appendChild(name);
    textBlock.appendChild(position);

    leftBlock.appendChild(textBlock);

    const image = createElement('img', {src: `${element.image}`, alt: `${element.alt}`, class: 'user-review__image'});

    userReview.appendChild(leftBlock);
    userReview.appendChild(image);

    userReview.style.display = 'none';

    if (!counter) {
      userReview.style.display = 'flex';
      counter = true;
    }

    userReviews.push(userReview);
    mainBlock.appendChild(userReview);
  });

  const rightArrow = createElement('button', {class: 'button button--right-arrow'});
  mainBlock.appendChild(rightArrow);

  let slideIndex = 0;

  function SliderDisplay(mainBlock, userReviews) {
    Slider.apply(this, arguments);

    const self = this;
    const dots = [];
    let activeDots = false;

    this.dots = function () {
      activeDots = true;

      const dotsWrapper = createElement('div', {class: 'dots__wrapper'});

      for (let i = 0; i < userReviews.length; i++) {
        const dot = createElement('span', {class: 'dot'});

        dots.push(dot);
        dotsWrapper.appendChild(dot);
      }

      dots[0].classList.add('active');
      mainBlock.appendChild(dotsWrapper);

      dots.forEach((element, i) => {
        element.addEventListener('click', () => {
          slideIndex = i;
          this.showSlides(slideIndex);
        });
      });
    };

    this.showSlides = function (n) {
      if (n === userReviews.length) {
        slideIndex = 0;
      }

      if (n === -1) {
        slideIndex = userReviews.length - 1;
      }

      for (let i = 0; i < userReviews.length; i++) {
        userReviews[i].style.display = 'none';
      }

      if (activeDots) {
        for (let i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '');
        }
        dots[slideIndex].className += ' active';
      }

      userReviews[slideIndex].style.display = 'flex';
    };

    this.sliderRight = function () {
      self.showSlides(++slideIndex);
    };

    this.sliderLeft = function () {
      self.showSlides(--slideIndex);
    };
  }

  const slider = new SliderDisplay(mainBlock, userReviews);
  slider.controlsSlider(leftArrow, rightArrow);
  slider.dots();
  slider.autoSlide();

  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(section);
}
