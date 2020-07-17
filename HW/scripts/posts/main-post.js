import data from '../../json/posts.js';
import leftBlock from './mainBlock.js';
import createElement from '../createElement.js';
import Post from '../classPost.js';

const article = createElement('article', {
  class: 'main__article article',
});

const url = window.location;
const urlObject = new URL(url);
let postId = urlObject.searchParams.get('id');

if (!postId) {
  postId = 'latest-article';
}

fetch(`http://localhost:3000/api/articles/${postId}`)
  .then((response) => {
    if (response.status === 404) {
      article.textContent =
        'There is no article here, you can add a new one by clicking the button \'Add new post\' above';
      throw new Error('No articles found in DB');
    }
    return response.json();
  })

  .then((myJson) => {
    const currentPost = myJson;
    const post = new Post(data, currentPost);
    post.createPost(article, currentPost.type);
  })

  .catch((error) => {
    console.log(error);
  });

leftBlock.appendChild(article);
