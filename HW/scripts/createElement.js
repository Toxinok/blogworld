export default function createElement(tag, attributes, text) {
  const element = document.createElement(tag);

  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}
