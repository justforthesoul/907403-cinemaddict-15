import {allFilmCardsData, topRatedFilmCardsData, mostCommentedFilmCardsData, filtersData, allFilmPopupData} from './data/data';
import {createElement, renderElement, renderElements} from './utils/render';
import {createProfileRatingTemplate} from './view/profile-rating-template';
import {createSiteMenuTemplate} from './view/site-menu-template';
import {createSortTemplate} from './view/sort-template';
import {createFilmsSectionTemplate} from './view/films-section-template';
import {createFilmListTemplate} from './view/film-list-template';
import {createFilmListCardsTemplate} from './view/film-cards-template';
import {createShowMoreButtonTemplate} from './view/show-more-button-template';
import {createFilmDetailsTemplate} from './view/film-details-template';
import {footerStatisticsTemplate} from './view/footer-statistics-template';
import {appState} from './app-state';
import {isEscEvent} from './utils/helper';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

renderElement(headerElement, createElement(createProfileRatingTemplate()));
renderElement(mainElement, createElement(createSiteMenuTemplate(filtersData)));
renderElement(mainElement, createElement(createSortTemplate()));
renderElement(mainElement, createElement(createFilmsSectionTemplate()));

const filmsSectionElement = document.querySelector('.films');

renderElement(filmsSectionElement, createElement(createFilmListTemplate('base', allFilmCardsData)));

if (appState.cardShown < appState.allFilmsCounter) {
  renderElement(filmsSectionElement, createElement(createShowMoreButtonTemplate()));
  const showMoreButtonElement = document.querySelector('.films-list__show-more');
  const mainFilmContainerElement = document.querySelector('.films-list__container');

  const checkShowMoreButtonState = () => {
    if (appState.cardShown === appState.allFilmsCounter) {
      showMoreButtonElement.removeEventListener('click', onShowMoreButtonClick);
      showMoreButtonElement.remove();
    }
  };

  const onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    renderElements(mainFilmContainerElement, createFilmListCardsTemplate('base', allFilmCardsData));
    checkShowMoreButtonState();
  };

  showMoreButtonElement.addEventListener('click', onShowMoreButtonClick);
}

renderElement(filmsSectionElement, createElement(createFilmListTemplate('topRated', topRatedFilmCardsData)));
renderElement(filmsSectionElement, createElement(createFilmListTemplate('mostCommented', mostCommentedFilmCardsData)));
renderElement(footerStatisticsElement, createElement(footerStatisticsTemplate()));

const closePopup = () => {
  document.querySelector('.film-details').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePopup();
  }
};

const onDocumentClick = ({target}) => {
  if (target.closest('.film-card__poster')) {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    const currentId = +target.closest('.film-card').dataset.id;
    renderElement(document.body, createElement(createFilmDetailsTemplate(allFilmPopupData[currentId])));
    document.addEventListener('keydown', onDocumentKeydown);
  }

  if (target.closest('.film-details__close-btn')) {
    closePopup();
  }
};

document.addEventListener('click', onDocumentClick);
