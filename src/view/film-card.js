import AbstractComponent from './abstract-component';

const createFilmCardTemplate = (data) => {
  const {
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
  return `<article class="film-card">
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

export default class FilmCard extends AbstractComponent {
  constructor (card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._card.id);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}

