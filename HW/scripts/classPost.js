import createElement from './createElement.js';

export default class Post {
  constructor(data, currentPost) {
    this.data = data;
    this.currentPost = currentPost;
  }

  // eslint-disable-next-line max-statements, complexity
  createPost(article, postType) {
    this.article = article;

    const title = createElement(
      'h1',
      {class: 'article__title'},
      this.currentPost.title,
    );

    this.article.appendChild(title);

    const header = this.createHeader();
    this.article.appendChild(header);

    if (postType === 'video') {
      const media = createElement('video', {
        src: `${this.currentPost.mediaLink}`,
        class: 'article__image',
        controls: 'controls',
      });
      this.article.appendChild(media);
    } else if (postType === 'audio') {
      const media = createElement('audio', {
        src: `${this.currentPost.mediaLink}`,
        class: 'article__image',
        controls: 'controls',
      });
      this.article.appendChild(media);
    } else if (postType === 'image') {
      const media = createElement('img', {
        src: `${this.currentPost.mediaLink}`,
        alt: 'main-post',
        class: 'article__image',
      });
      this.article.appendChild(media);
    }

    for (const key in this.currentPost.text) {
      const property = this.currentPost.text[key];

      if (key.indexOf('text') !== -1) {
        const openTag = "<h4 class='article__text'>";
        const closeTag = '</h4>';
        if (Array.isArray(property)) {
          property.forEach((el) => {
            const element = openTag + el + closeTag;

            this.article.innerHTML += element;
          });
        } else {
          const element = openTag + property + closeTag;

          this.article.innerHTML += element;
        }
      } else if (key.indexOf('subtitle') !== -1) {
        const subtitle = createElement(
          'h2',
          {class: 'article__subtitle'},
          property,
        );
        this.article.appendChild(subtitle);
      } else if (key.indexOf('middle') !== -1) {
        const openTag = "<h4 class='article__text article__text--middle'>";
        const closeTag = '</h4>';

        const element = openTag + property + closeTag;

        this.article.innerHTML += element;
      }
    }

    {
      const footer = createElement('div', {class: 'article__footer'});

      const likes = createElement('a', {
        href: '#',
        class: 'article__likes',
      });

      const likesIcon = createElement('span', {
        class: 'article__likes-icon',
      });
      const likesCount = createElement(
        'h5',
        {class: 'article__likes-count'},
        `${this.data.article.footer.likes} likes`,
      );

      likes.appendChild(likesIcon);
      likes.appendChild(likesCount);

      const links = createElement('div', {
        class: 'footer__links footer__links--article',
      });

      this.data.article.footer.links.forEach((element) => {
        const link = createElement('a', {
          href: '#',
          class: `footer__link footer__link--post footer__link--${element}`,
        });

        links.appendChild(link);
      });

      footer.appendChild(likes);
      footer.appendChild(links);

      this.article.appendChild(footer);
    }
  }

  // eslint-disable-next-line max-statements
  createBlogPost(article, postType) {
    this.article = article;

    if (postType === 'video') {
      const media = createElement('div', {class: 'article__media'});
      const video = createElement('video', {
        src: `${this.currentPost.mediaLink}`,
        class: 'article__video',
        controls: 'controls',
      });

      media.appendChild(video);
      article.appendChild(media);
    } else if (postType === 'image') {
      const image = createElement('img', {
        src: `${this.currentPost.mediaLink}`,
        class: 'article__media',
      });

      article.appendChild(image);
    } else if (postType === 'audio') {
      const image = createElement('img', {
        src: 'img/blog/article2.png',
        class: 'article__media',
      });

      this.article.appendChild(image);
    }

    const mainBlock = createElement('div', {
      class: 'article__main-block',
    });
    this.article.appendChild(mainBlock);

    const iconWrapper = createElement('div', {
      class: 'article__icon-wrapper',
    });
    const icon = createElement('span', {class: 'article__icon'});

    iconWrapper.appendChild(icon);

    const header = this.createHeader();

    mainBlock.appendChild(header);

    const title = createElement(
      'h3',
      {class: 'article__title'},
      this.currentPost.title,
    );

    const description = createElement(
      'h4',
      {class: 'article__text'},
      this.currentPost.description,
    );

    const button = createElement(
      'a',
      {
        href: `posts.html?id=${this.currentPost._id}`,
        class: 'button article__button',
      },
      'Read more',
    );

    const editPostButton = createElement(
      'a',
      {class: 'button article__button article__edit-button', href: `postForm.html?id=${this.currentPost._id}`},
      'Edit description',
    );

    const deleteButton = createElement(
      'button',
      {
        class: 'button article__delete-button',
        'data-id': this.currentPost._id,
      },
      'Delete post',
    );

    mainBlock.appendChild(title);
    if (postType === 'audio') {
      const audio = createElement('audio', {
        src: `${this.currentPost.mediaLink}`,
        controls: 'controls',
        class: 'article__audio',
      });

      mainBlock.appendChild(audio);
    }

    mainBlock.appendChild(description);
    mainBlock.appendChild(button);
    mainBlock.appendChild(editPostButton);
    mainBlock.appendChild(deleteButton);
  }

  // eslint-disable-next-line max-statements
  createHeader() {
    const header = createElement('div', {class: 'article__header'});

    const image = createElement('span', {class: 'article__header-image'});

    const text = createElement('div', {class: 'article__header-text'});
    const name = createElement(
      'h4',
      {class: 'article__header-name'},
      this.currentPost.name,
    );
    const date = createElement(
      'h5',
      {class: 'article__date'},
      this.currentPost.date,
    );
    let dot = createElement('dot', {class: 'article__dot'});
    const readTime = createElement(
      'h5',
      {class: 'article__read-time'},
      this.data.article.header.readTime,
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
      this.data.article.header.commentsCount,
    );

    comments.appendChild(commentsIcon);
    comments.appendChild(commentsCount);

    const starBlock = createElement('div', {
      class: 'article__star-block',
    });

    {
      const full = Math.floor(this.data.article.header.stars);
      for (let i = 0; i < full; i++) {
        const fullStar = createElement('span', {
          class: 'article__star article__star--full',
        });

        starBlock.appendChild(fullStar);
      }

      if (this.data.article.header.stars % full !== 0) {
        const halfStar = createElement('span', {
          class: 'article__star article__star--half',
        });

        starBlock.appendChild(halfStar);
      }

      const empty = 5 - Math.ceil(this.data.article.header.stars);
      for (let i = 0; i < empty; i++) {
        const emptyStar = createElement('span', {
          class: 'article__star article__star--empty',
        });

        starBlock.appendChild(emptyStar);
      }
    }

    text.appendChild(name);
    text.appendChild(date);
    text.appendChild(dot);
    text.appendChild(readTime);
    dot = createElement('dot', {class: 'article__dot'});
    text.appendChild(dot);
    text.appendChild(comments);
    text.appendChild(starBlock);

    header.appendChild(image);
    header.appendChild(text);

    return header;
  }
}
