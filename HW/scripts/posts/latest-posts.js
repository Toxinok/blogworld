import data from '../../json/posts.js';
import {aside} from './mainBlock.js';
import createElement from '../createElement.js';

{
  const latestPosts = createElement('div', {class: 'aside__item latest-posts'});

  const title = createElement('h2', {class: 'latest-posts__title'}, data.latestPosts.title);
  latestPosts.appendChild(title);

  data.latestPosts.items.forEach((element) => {
    const article = createElement('div', {class: 'latest-posts__article'});

    const image = createElement('img', {src: `${element.image}`, alt: `${element.imageAlt}`,class: 'latest-posts__image'});

    const articleBlock = createElement('div', {class: 'latest-posts__article-block'});
    const subtitle = createElement('h4', {class: 'latest-posts__subtitle'}, element.subtitle);
    const date = createElement('h5', {class: 'article__date'}, element.date);
    let dot = createElement('span', {class: 'article__dot'});
    const readTime = createElement('h5', {class: 'article__read-time'}, element.readTime);

    const comments = createElement('a', {href: '#', class: 'article__comments article__comments--margin'});

    const commentsIcon = createElement('span', {class: 'article__comments-icon'});
    const commentsCount = createElement('h5', {class: 'article__comments-count'}, element.commentsCount);

    comments.appendChild(commentsIcon);
    comments.appendChild(commentsCount);

    articleBlock.appendChild(subtitle);
    articleBlock.appendChild(date);
    articleBlock.appendChild(dot);
    articleBlock.appendChild(readTime);
    dot = createElement('span', {class: 'article__dot'});
    articleBlock.appendChild(dot);
    articleBlock.appendChild(comments);

    article.appendChild(image);
    article.appendChild(articleBlock);

    latestPosts.appendChild(article);
  });

  const buttonWrapper = createElement('div', {class: 'button-wrapper'});
  const button = createElement('button', {class: 'button'}, data.latestPosts.button);

  buttonWrapper.appendChild(button);
  latestPosts.appendChild(buttonWrapper);

  aside.appendChild(latestPosts);
}
