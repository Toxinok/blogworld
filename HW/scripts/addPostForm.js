import header from './header.js';
import footer from './footer.js';
import createElement from './createElement.js';
import '../scss/addPostForm.scss';

{
  const wrapper = document.getElementById('wrapper');

  const container = createElement('div', {class: 'container'});
  wrapper.appendChild(container);
  wrapper.appendChild(footer);

  container.appendChild(header);

  const postForm = createElement('form', {
    method: 'post',
    class: 'post-form',
    id: 'postForm',
  });
  container.appendChild(postForm);

  const createPostObject = {};

  const title = createElement(
    'h3',
    {class: 'post-form__title'},
    'Add new post',
  );
  postForm.appendChild(title);

  const typeLabel = createElement(
    'label',
    {class: 'post-form__type-title'},
    'Type of post',
  );
  const typeSelect = createElement('select', {
    id: 'postFormType',
    class: 'post-form__type',
  });

  const option0 = createElement(
    'option',
    {
      selected: 'selected',
      disabled: 'disabled',
      hidden: 'hidden',
    },
    'Choose here',
  );
  const option1 = createElement('option', {value: 'Video'}, 'Video');
  const option2 = createElement('option', {value: 'Audio'}, 'Audio');
  const option3 = createElement('option', {value: 'Image'}, 'Image');
  const option4 = createElement('option', {value: 'Text'}, 'Text');

  typeSelect.appendChild(option0);
  typeSelect.appendChild(option1);
  typeSelect.appendChild(option2);
  typeSelect.appendChild(option3);
  typeSelect.appendChild(option4);

  typeLabel.appendChild(typeSelect);

  const mediaLabel = createElement('label', {id: 'postFormMedia'});
  const mediaText = createElement(
    'span',
    {id: 'postFormMediaText'},
    'Medialink',
  );
  const mediaInput = createElement('input', {
    type: 'text',
    placeholder: 'http:// or https://',
    id: 'postFormMediaLink',
  });

  const description = createElement(
    'label',
    {},
    'Description (max length - 300)',
  );
  const descriptionInput = createElement('textarea', {
    id: 'postFormDesc',
    maxlength: '300',
  });
  description.appendChild(descriptionInput);

  function setSelectType(type) {
    createPostObject.type = type;
    if (type === 'text') {
      mediaLabel.style.display = 'none';
    } else {
      mediaLabel.style.display = 'block';
      mediaText.textContent = `${type.charAt(0).toUpperCase()}${type.substring(
        1,
      )} (link)`;
    }
  }

  typeSelect.addEventListener('change', () => {
    switch (event.target.value) {
      case 'Video':
        setSelectType('video');
        break;
      case 'Audio':
        setSelectType('audio');
        break;
      case 'Image':
        setSelectType('image');
        break;
      case 'Text':
        setSelectType('text');
        break;
    }
  });

  mediaInput.addEventListener('change', () => {
    if (
      event.target.value.startsWith('https://') ||
      event.target.value.startsWith('http://')
    ) {
      mediaInput.setCustomValidity('');
      createPostObject.mediaLink = event.target.value;
    } else {
      mediaInput.setCustomValidity(
        'Bad value, please type link again starting with http:// or https://',
      );
    }
  });

  mediaLabel.appendChild(mediaText);
  mediaLabel.appendChild(mediaInput);

  const formTitle = createElement('label', {}, 'Title');
  const formTitleInput = createElement('input', {
    id: 'postFormTitle',
    type: 'text',
  });
  formTitle.appendChild(formTitleInput);

  function validateTitle(str) {
    const regExp = /^[A-Z]{1}[0-9a-zA-Z !:-?.,]{5,59}$/;
    return regExp.test(str);
  }

  formTitleInput.addEventListener('change', () => {
    if (validateTitle(event.target.value)) {
      formTitleInput.setCustomValidity('');
      createPostObject.title = event.target.value;
    } else {
      formTitleInput.setCustomValidity(
        'Bad value, please type title again starting with a capital letter and minimum number of characters 6',
      );
    }
  });

  const author = createElement('label', {}, 'Author');
  const authorInput = createElement('input', {
    id: 'postFormAuthor',
    type: 'text',
  });
  author.appendChild(authorInput);

  const formDate = createElement('label', {}, 'Date');
  const dateInput = createElement('input', {
    id: 'postFormDate',
    type: 'date',
  });
  formDate.appendChild(dateInput);

  const text = createElement('label', {}, 'Text');
  const textInput = createElement('textarea', {id: 'postFormText'});
  text.appendChild(textInput);

  const quote = createElement('label', {}, 'Quote');
  const quoteInput = createElement('textarea', {id: 'postFormQuote'});
  quote.appendChild(quoteInput);

  const buttonWrapper = createElement('div', {
    class: 'post-form__button-wrapper',
  });
  const button = createElement('input', {
    type: 'submit',
    class: 'button button--grey post-form__button',
    value: 'Add post',
  });
  buttonWrapper.appendChild(button);

  const url = window.location;
  const urlObject = new URL(url);
  const currentPostEdit = urlObject.searchParams.get('id');

  if (currentPostEdit) {
    postForm.append(formTitle, author, description, buttonWrapper);

    fetch(`http://localhost:3000/api/articles/${currentPostEdit}`)
      .then((response) => response.json())
      .then((currentArticle) => {
        title.textContent = 'Edit post';

        descriptionInput.value = currentArticle.description;

        formTitleInput.value = currentArticle.title;
        formTitleInput.disabled = true;
        authorInput.value = currentArticle.name;
        authorInput.disabled = true;
      });
  } else {
    postForm.append(
      typeLabel,
      mediaLabel,
      formTitle,
      author,
      formDate,
      description,
      text,
      quote,
      buttonWrapper,
    );
  }

  // eslint-disable-next-line max-statements
  postForm.addEventListener('submit', () => {
    event.preventDefault();

    if (currentPostEdit) {
      const postEditObject = {
        description: descriptionInput.value,
      };

      fetch(`http://localhost:3000/api/articles/${currentPostEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postEditObject),
      });

      window.location.href = './blog.html';
    } else {
      createPostObject.name = authorInput.value;

      const date = new Date(dateInput.value);
      const day = date.getDate();
      const month = date.toLocaleString('default', {month: 'short'});
      const year = date.getFullYear();

      createPostObject.date = `${day} ${month}, ${year}`;

      createPostObject.description = descriptionInput.value;

      const text1 = textInput.value.split(/\n/g);
      const textObj = {};

      textObj.text1 = text1;

      textObj.middle = quoteInput.value;

      createPostObject.text = textObj;

      fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPostObject),
      });

      window.location.href = './posts.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const textareas = document.getElementsByTagName('textarea');

  [...textareas].forEach((element) => {
    element.addEventListener('input', () => {
      element.style.height = `${62}px`;
      element.style.height = `${element.scrollHeight}px`;
    });
  });
});
