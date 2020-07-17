import header from './header.js';
import footer from './footer.js';
import createElement from './createElement.js';
import '../scss/authorsPage.scss';

const wrapper = document.getElementById('wrapper');

const container = createElement('div', {class: 'container'});
wrapper.appendChild(container);
wrapper.appendChild(footer);

container.appendChild(header);

const authorsWrapper = createElement('div', {class: 'authors__wrapper'});
container.appendChild(authorsWrapper);

fetch('http://localhost:3000/api/articles/authors')
  .then((response) => {
    if (response.status === 404) {
      const article = createElement(
        'article',
        {
          class: 'authors--empty',
        },
        'There are no articles here, you can add a new one by clicking the button \'Add new post\' above',
      );
      authorsWrapper.appendChild(article);
      throw new Error('No articles found in DB');
    }

    return response.json();
  })

  // eslint-disable-next-line max-statements
  .then((authors) => {
    const buttonsTop = createElement('div', {
      class: 'authors__buttons-top',
    });
    const buttonsAside = createElement('div', {
      class: 'authors__buttons-aside',
    });

    let countButtons = 0;
    for (const authorName in authors) {
      let authorButton = createElement(
        'button',
        {
          class: 'button authors__button authors__button--top',
          'data-number': countButtons,
        },
        authorName,
      );
      buttonsTop.appendChild(authorButton);

      authorButton = createElement(
        'button',
        {
          class: 'button authors__button authors__button--aside',
          'data-number': countButtons,
        },
        authorName,
      );
      buttonsAside.appendChild(authorButton);
      countButtons++;

      const authorButtonPostsTop = createElement('div', {
        class: 'authors__posts authors__posts--top',
      });

      const authorButtonPostsAside = createElement('div', {
        class: 'authors__posts authors__posts--aside',
      });

      authors[authorName].forEach((element) => {
        let shortTitle = element.title.slice(0, 20);
        if (shortTitle.length >= 20) {
          shortTitle += '...';
        }

        const authorPostButton = createElement(
          'h5',
          {
            class: 'authors__post-button',
            'data-id': element.id,
          },
          shortTitle,
        );

        authorButtonPostsTop.appendChild(authorPostButton);
        authorButtonPostsAside.appendChild(authorPostButton.cloneNode(true));
      });

      buttonsTop.appendChild(authorButtonPostsTop);
      buttonsAside.appendChild(authorButtonPostsAside);
    }

    const postWrapper = createElement('div', {
      class: 'authors__post-wrapper post__wrapper',
    });

    function toggleClassChildren(parent, className) {
      const children = parent.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains(className)) {
          children[i].classList.remove(className);
        }
      }
    }

    function postButtonsDisplay(options) {
      if (!options.event) {
        options.event = window.event;
      }
      if (options.event.target.tagName === 'BUTTON') {
        const authorButtonPostsArray = document.getElementsByClassName(
          'authors__posts',
        );

        for (let i = 0; i < authorButtonPostsArray.length; i++) {
          authorButtonPostsArray[i].style.display = 'none';
        }

        for (let i = 0; i < options.authorButtons.length; i++) {
          const currentAuthorButtonPosts =
            options.authorButtons[i].nextElementSibling;
          currentAuthorButtonPosts.style.display = 'block';
          toggleClassChildren(
            currentAuthorButtonPosts,
            'authors__post-button--active',
          );
        }
      }
    }

    function highlightPostButtons(options) {
      if (options.event.target.dataset.id) {
        for (let i = 0; i < options.postButtons.length; i++) {
          const currentAuthorButtonPosts = options.postButtons[i].parentElement;
          toggleClassChildren(
            currentAuthorButtonPosts,
            'authors__post-button--active',
          );
          options.postButtons[i].classList.add('authors__post-button--active');
        }
      }
    }

    function getAndDisplayPost(options) {
      if (options.event.target.dataset.id) {
        fetch(
          `http://localhost:3000/api/articles/${options.event.target.dataset.id}`,
        )
          .then((response) => {
            if (response.status === 404) {
              options.postWrapper.textContent = 'No such article found in DB';
              throw new Error('Article by id not found');
            }

            return response.json();
          })

          // eslint-disable-next-line complexity, max-statements
          .then((currentClickedPost) => {
            if (options.postWrapper.hasChildNodes()) {
              while (options.postWrapper.hasChildNodes()) {
                options.postWrapper.removeChild(options.postWrapper.lastChild);
              }
            }

            const postTitle = createElement(
              'h1',
              {class: 'post__title'},
              currentClickedPost.title,
            );
            options.postWrapper.appendChild(postTitle);

            if (currentClickedPost.mediaLink) {
              switch (currentClickedPost.type) {
                case 'audio': {
                  const postMedia = createElement('audio', {
                    src: currentClickedPost.mediaLink,
                    controls: 'controls',
                    class: 'post__media',
                  });
                  options.postWrapper.appendChild(postMedia);
                  break;
                }

                case 'image': {
                  const postMedia = createElement('img', {
                    class: 'post__media',
                    alt: 'post-media',
                    src: currentClickedPost.mediaLink,
                  });
                  options.postWrapper.appendChild(postMedia);
                  break;
                }

                case 'video': {
                  const postMedia = createElement('video', {
                    src: currentClickedPost.mediaLink,
                    class: 'post__media',
                    controls: 'controls',
                  });
                  options.postWrapper.appendChild(postMedia);
                  break;
                }
              }
            }

            const postDescription = createElement(
              'h4',
              {class: 'post__description'},
              currentClickedPost.description,
            );
            options.postWrapper.appendChild(postDescription);
          });
      }
    }

    const mediator = (() => {
      let subscribers = {};

      return {
        subscribe(event, callback) {
          subscribers[event] = subscribers[event] || [];
          subscribers[event].push(callback);
        },

        unsubscribe(event, callback) {
          let subscriberIndex;

          if (!event) {
            subscribers = {};
          } else if (event && !callback) {
            subscribers[event] = [];
          } else {
            subscriberIndex = subscribers[event].indexOf(callback);
            if (subscriberIndex > -1) {
              subscribers[event].splice(subscriberIndex, 1);
            }
          }
        },

        publish(event, data) {
          if (subscribers[event]) {
            subscribers[event].forEach((callback) => {
              callback(data);
            });
          }
        },
      };
    })();

    function createOptions(event, postWrapper) {
      const authorButtonNumber = event.target.dataset.number;
      const authorButtons = document.querySelectorAll(
        `[data-number~='${authorButtonNumber}']`,
      );

      const postButtonId = event.target.dataset.id;
      clickedPostId = postButtonId;

      const postButtons = document.querySelectorAll(
        `[data-id~='${postButtonId}']`,
      );

      return {
        event,
        authorButtons,
        postButtons,
        postWrapper,
      };
    }

    mediator.subscribe('click', postButtonsDisplay);
    mediator.subscribe('click', highlightPostButtons);
    mediator.subscribe('click', getAndDisplayPost);

    let clickedPostId;

    buttonsTop.addEventListener('click', (event) => {
      if (clickedPostId !== event.target.dataset.id || !clickedPostId) {
        const options = createOptions(event, postWrapper);

        mediator.publish('click', options);
      }
    });

    buttonsAside.addEventListener('click', (event) => {
      if (clickedPostId !== event.target.dataset.id || !clickedPostId) {
        const options = createOptions(event, postWrapper);

        mediator.publish('click', options);
      }
    });

    authorsWrapper.appendChild(buttonsTop);
    authorsWrapper.appendChild(postWrapper);
    authorsWrapper.appendChild(buttonsAside);
  })

  .catch((error) => {
    console.error(error);
  });
