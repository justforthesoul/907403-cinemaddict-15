import {createFilmListCardsTemplate} from './film-cards-template';

const TITLES = {
  'base': {
    title: 'All movies. Upcoming',
    isVisible: false,
    isExtra: false,
  },
  'topRated': {
    title: 'Top rated',
    isVisible: true,
    isExtra: true,
  },
  'mostCommented': {
    title: 'Most commented',
    isVisible: true,
    isExtra: true,
  },
};

export const createFilmListTemplate = (state, data) => {
  const {title, isVisible, isExtra} = TITLES[state];
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
            <h2 class="films-list__title ${isVisible ? '' : 'visually-hidden'}">${title}</h2>
            <div class="films-list__container">
              ${createFilmListCardsTemplate(state, data)}
            </div>
          </section>`;
};
