const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, component, place = 'beforeend') => {
  switch (place) {
    case 'prepend':
      container.prepend(component);
      break;
    case 'afterend':
      container.after(component);
      break;
    case 'beforeend':
      container.append(component);
      break;
    default:
      container.append(component);
      break;
  }
};

export {createElement, renderElement};
