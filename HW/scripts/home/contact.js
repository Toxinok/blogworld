import data from '../../json/home.js';
import createElement from '../createElement.js';
import googleMap from '../googleMap.js';
import footer from '../footer.js';

{
  const section = createElement('section', {
    id: 'contactUs',
    class: 'contact-us',
  });
  const container = createElement('div', {class: 'container'});

  section.appendChild(container);

  const titleBlock = createElement('div', {class: 'contact-us__title-block'});
  const title = createElement(
    'h2',
    {class: 'contact-us__title'},
    data.contactUs.title,
  );
  const titleUnderline = createElement('div', {
    class: 'contact-us__title-underline',
  });
  const text = createElement(
    'h4',
    {class: 'contact-us__text'},
    data.contactUs.text,
  );

  titleBlock.appendChild(title);
  titleBlock.appendChild(titleUnderline);
  titleBlock.appendChild(text);

  container.appendChild(titleBlock);

  const mainBlock = createElement('div', {class: 'contact-us__main-block'});

  const leftBlock = createElement('div', {class: 'contact-us__left-block'});

  const links = createElement('div', {class: 'contact-us__links'});

  data.contactUs.links.forEach((element) => {
    const link = createElement('a', {
      href: '#',
      class: `contact-us__link contact-us__link--${element}`,
    });

    links.appendChild(link);
  });

  const steps = createElement('div', {class: 'contact-us__steps steps'});

  const stepsTitle = createElement(
    'h2',
    {class: 'steps__title'},
    data.steps.title,
  );
  steps.appendChild(stepsTitle);

  data.steps.items.forEach((element) => {
    const stepsItem = createElement('div', {class: 'steps__item'});

    const nameBlock = createElement('h5', {class: 'steps__name'});
    const nameIcon = createElement('span', {class: 'steps__name--icon'});
    const name = createElement(
      'span',
      {class: 'steps__name--bold'},
      element.name,
    );

    nameBlock.appendChild(nameIcon);
    nameBlock.appendChild(document.createTextNode(element.number));
    nameBlock.appendChild(name);

    const text = createElement('h5', {class: 'steps__text'}, element.text);
    if (element.line) {
      text.classList.add('steps__text--line');
    }

    stepsItem.appendChild(nameBlock);
    stepsItem.appendChild(text);

    steps.appendChild(stepsItem);
  });

  leftBlock.appendChild(links);
  leftBlock.appendChild(steps);

  const feedback = createElement('div', {
    class: 'contact-us__feedback feedback',
  });

  {
    const header = createElement('div', {class: 'feedback__header'});
    const headerText = createElement('h4', {class: 'feedback__header-text'});
    const headerIcon = createElement('span', {
      class: 'feedback__header-icon',
    });
    const headerSemiBold = createElement(
      'span',
      {class: 'feedback__header-text--semibold'},
      data.feedback.headerSemiBold,
    );

    headerText.appendChild(headerIcon);
    headerText.appendChild(document.createTextNode(data.feedback.headerText));
    headerText.appendChild(headerSemiBold);

    header.appendChild(headerText);

    feedback.appendChild(header);
  }

  const feedbackMainBlock = createElement('div', {
    class: 'feedback__main-block',
  });
  const feedbackForm = createElement('div', {class: 'feedback__form'});
  const form = createElement('form', {
    method: 'post',
    action: '#',
    class: 'form',
  });

  data.form.items.forEach((element) => {
    const label = createElement(
      'label',
      {for: `${element.inputId}`, class: 'form__label'},
      element.label,
    );

    if (element.inputType === 'password') {
      const passVisibility = createElement(
        'a',
        {href: '#', class: 'form__pass-visibility'},
        'show',
      );
      label.appendChild(passVisibility);
    }

    const input = createElement('input', {
      type: `${element.inputType}`,
      id: `${element.inputId}`,
      class: 'form__input',
    });

    form.appendChild(label);
    form.appendChild(input);
  });

  const formSubmit = createElement('input', {
    type: 'submit',
    value: 'Send message',
    class: 'button button--grey form__submit',
  });
  const formText = createElement('h4', {class: 'form__text'}, data.form.text);
  const formEmail = createElement(
    'a',
    {href: '#', class: 'form__text-email'},
    data.form.email,
  );

  formText.appendChild(formEmail);

  form.appendChild(formSubmit);
  form.appendChild(formText);
  feedbackForm.appendChild(form);

  feedbackMainBlock.appendChild(feedbackForm);
  feedbackMainBlock.appendChild(googleMap);

  feedback.appendChild(feedbackMainBlock);

  mainBlock.appendChild(leftBlock);
  mainBlock.appendChild(feedback);

  container.appendChild(mainBlock);

  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(section);
  wrapper.appendChild(footer);
}
