import data from '../../json/blog.js';
import header from '../header.js';
import createElement from '../createElement.js';
import postData from '../../json/posts.js';
import Post from '../classPost.js';
import footer from '../footer.js';
import '../modal.js';
import '../../scss/blog/main.scss';

{
  const wrapper = document.getElementById('wrapper');
  const container = createElement('div', {class: 'container'});

  const titleBlock = createElement('div', {class: 'main__title-block'});
  const title = createElement('h2', {class: 'main__title'}, data.main.title);
  const titleUnderline = createElement('div', {
    class: 'main__title-underline',
  });

  titleBlock.appendChild(title);
  titleBlock.appendChild(titleUnderline);

  container.appendChild(header);
  container.appendChild(titleBlock);

  fetch('http://localhost:3000/api/articles')
    .then((response) => {
      if (response.status === 404) {
        const article = createElement(
          'article',
          {
            class: 'article--empty',
          },
          'There are no articles here, you can add a new one by clicking the button \'Add new post\' above',
        );
        container.appendChild(article);
        throw new Error('No articles found in DB');
      }

      return response.json();
    })
    // eslint-disable-next-line max-statements
    .then((myJson) => {
      const searchWrapper = createElement('form', {
        class: 'main__search-wrapper',
      });
      const searchLabel = createElement('label', {class: 'main__search-label'});
      const searchIcon = createElement('span', {class: 'main__search-icon'});
      const swapIcon = createElement('span', {class: 'main__swap-icon'});
      const search = createElement('input', {
        type: 'search',
        placeholder: 'Search by author',
        class: 'main__search',
      });

      searchLabel.appendChild(searchIcon);
      searchLabel.appendChild(swapIcon);
      searchLabel.appendChild(search);
      searchWrapper.appendChild(searchLabel);

      container.appendChild(searchWrapper);

      const posts = myJson;
      const postsArr = [];

      posts.forEach((element) => {
        const article = createElement('article', {
          class: `main__article article article--${element.type}`,
        });

        const post = new Post(postData, element);
        post.createBlogPost(article, element.type);

        postsArr.push(article);
        container.appendChild(article);
      });

      $(document).ready(() => {
        let postId;

        $('.article__delete-button')
          .click(function () {
            postId = this.dataset.id;
          })
          .modalWindow({
            type: 'error',
            appendTo: 'button',
            message: 'Delete this post?',
            buttonsNumber: 2,
            confirmCallback: () => {
              fetch(`http://localhost:3000/api/articles/${postId}`, {
                method: 'DELETE',
              });
              location.reload();
            },
          });
      });

      let searchTitle = true;

      function isSearchTitle() {
        if (searchTitle) {
          search.placeholder = 'Search by title';
        } else {
          search.placeholder = 'Search by author';
        }
        search.value = '';
        searchTitle = !searchTitle;
      }

      swapIcon.addEventListener('click', isSearchTitle);

      function searchPosts() {
        posts.forEach((element, index) => {
          if (searchTitle) {
            if (element.name.search(search.value) === -1) {
              postsArr[index].remove();
            } else {
              container.appendChild(postsArr[index]);
            }
          } else {
            if (element.title.search(search.value) === -1) {
              postsArr[index].remove();
            } else {
              container.appendChild(postsArr[index]);
            }
          }
        });
        localStorage.setItem('searchRequest', search.value);
        localStorage.setItem('searchTitle', searchTitle);
      }

      if (localStorage.getItem('searchRequest')) {
        searchTitle = JSON.parse(localStorage.getItem('searchTitle'));
        if (!searchTitle) {
          search.placeholder = 'Search by title';
        }

        search.value = localStorage.getItem('searchRequest');
        searchPosts();
      }

      searchIcon.addEventListener('click', searchPosts);

      search.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchPosts();
        }
      });

      const button = createElement(
        'button',
        {class: 'button button--grey main__button'},
        data.main.button,
      );
      container.appendChild(button);
    })
    .catch((error) => {
      console.error(error);
    });

  wrapper.appendChild(container);
  wrapper.appendChild(footer);
}
