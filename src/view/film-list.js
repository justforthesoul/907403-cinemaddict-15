import AbstractComponent from './abstract-component';

const TITLES = {
  base: {
    title: 'All movies. Upcoming',
    isVisible: false,
    isExtra: false,
  },
  topRated: {
    title: 'Top rated',
    isVisible: true,
    isExtra: true,
  },
  mostCommented: {
    title: 'Most commented',
    isVisible: true,
    isExtra: true,
  },
  empty: {
    title: 'There are no movies in our database',
    isVisible: true,
    isExtra: false,
  },
};

const createFilmListTemplate = (state) => {
  const {title, isVisible, isExtra} = TITLES[state];
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
            <h2 class="films-list__title ${isVisible ? '' : 'visually-hidden'}">${title}</h2>
            ${TITLES[state] !== 'empty' ?
    '<div class="films-list__container"></div>'
    :
    ''}
  </section>`;
};

export default class FilmList extends AbstractComponent {
  constructor (state) {
    super();
    this._state = state;
  }

  getTemplate() {
    return createFilmListTemplate(this._state);
  }
}
