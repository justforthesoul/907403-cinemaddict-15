import {appState} from '../app-state';

const createFilmCardMarkup = (data) => {
  const {
    id,
    title,
    totalRating,
    releaseYear,
    runtime,
    genre,
    poster,
    description,
    comments,
    watchList,
    alreadyWatched,
    favorite,
  } = data;
  return `<article class="film-card" data-id=${id}>
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${releaseYear}</span>
              <span class="film-card__duration">${runtime}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            ${comments ? `<a class="film-card__comments">${comments} comments</a>` : ''}
            <div class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchList ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
            </div>
          </article>`;
};

export const createFilmListCardsTemplate = (state, data) => {
  if (state === 'base') {
    const {cardView, cardShown, allFilmsCounter} = appState;
    const startCard = cardShown;
    const stopCard = cardView + cardShown < allFilmsCounter ? cardView + cardShown : allFilmsCounter;
    appState.cardShown = appState.cardShown + appState.cardView < allFilmsCounter ? appState.cardView + appState.cardShown : allFilmsCounter;
    return data.map((el, index) => {
      if (index >= startCard && index < stopCard) {
        return createFilmCardMarkup(el);
      }
    }).join('\n');
  }
  return data.map((el) => {
    return createFilmCardMarkup(el);
  }).join('\n');
};
