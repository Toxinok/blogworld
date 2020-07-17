import data from '../../json/home.js';
import createElement from '../createElement.js';

{
  const section = createElement('section', {id: 'posts', class: 'posts'});
  const container = createElement('div', {class: 'container'});

  section.appendChild(container);

  const titleBlock = createElement('div', {class: 'posts__title-block'});
  const title = createElement(
    'h2',
    {class: 'posts__title'},
    data.posts.title,
  );
  const titleUnderline = createElement('div', {
    class: 'posts__title-underline',
  });
  const text = createElement('h4', {class: 'posts__text'}, data.posts.text);

  titleBlock.appendChild(title);
  titleBlock.appendChild(titleUnderline);
  titleBlock.appendChild(text);
  container.appendChild(titleBlock);

  const mainBlock = createElement('div', {class: 'posts__main-block'});
  container.appendChild(mainBlock);

  data.article.forEach((element) => {
    const article = createElement('article', {
      class: 'posts__article article',
    });
    const image = createElement('img', {
      src: `${element.image}`,
      alt: `${element.imageAlt}`,
      class: 'article__image',
    });
    const title = createElement('a', {href: '#', class: 'article__title'});
    const titleText = createElement('h3', {}, element.title);
    const text = createElement('h5', {class: 'article__text'}, element.text);

    title.appendChild(titleText);

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(text);

    const footer = createElement('div', {class: 'article__footer'});
    const date = createElement('h5', {class: 'article__date'}, element.date);
    let dot = createElement('span', {class: 'article__dot'});
    const readTime = createElement(
      'h5',
      {class: 'article__read-time'},
      element.readTime,
    );
    const comments = createElement('a', {
      href: '#',
      class: 'article__comments',
    });
    const commentsIcon = createElement('span', {
      class: 'article__comments-icon',
    });
    const commentsCount = createElement(
      'h5',
      {class: 'article__comments-count'},
      element.commentsCount,
    );

    footer.appendChild(date);
    footer.appendChild(dot);
    footer.appendChild(readTime);
    dot = createElement('span', {class: 'article__dot'});
    footer.appendChild(dot);

    comments.appendChild(commentsIcon);
    comments.appendChild(commentsCount);
    footer.appendChild(comments);

    article.appendChild(footer);

    mainBlock.appendChild(article);
  });

  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(section);
}
