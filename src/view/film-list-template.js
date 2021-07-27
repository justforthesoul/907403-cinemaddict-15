import {createFilmCardTemplate} from './film-card-template';

const createFilmListCardsTemplate = (cardCounter) => {
  let str = '';
  for (let i = 0; i < cardCounter; i++) {
    str += createFilmCardTemplate();
  }
  return str;
};

export const createFilmListTemplate = ({isExtra, cardCounter, title}) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
            <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>
            <div class="films-list__container">
              ${createFilmListCardsTemplate(cardCounter)}
            </div>
          </section>`;
};
