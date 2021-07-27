import {createElement, renderElement} from './utils/render';
import {createProfileRatingTemplate} from './view/profile-rating-template';
import {createSiteMenuTemplate} from './view/site-menu-template';
import {createSortTemplate} from './view/sort-template';
import {createFilmsSectionTemplate} from './view/films-section-template';
import {createFilmListTemplate} from './view/film-list-template';
import {createShowMoreButtonTemplate} from './view/show-more-button-template';
import {createFilmDetailsTemplate} from './view/film-details.template';

const allMoves = {
  isExtra: false,
  cardCounter: 5,
  title: 'All movies. Upcoming',
};

const topRated = {
  isExtra: true,
  cardCounter: 2,
  title: 'Top rated',
};

const mostCommented = {
  isExtra: true,
  cardCounter: 2,
  title: 'Most commented',
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

renderElement(headerElement, createElement(createProfileRatingTemplate()));
renderElement(mainElement, createElement(createSiteMenuTemplate()));
renderElement(mainElement, createElement(createSortTemplate()));
renderElement(mainElement, createElement(createFilmsSectionTemplate()));

const filmsSectionElement = document.querySelector('.films');

renderElement(filmsSectionElement, createElement(createFilmListTemplate(allMoves)));
renderElement(filmsSectionElement, createElement(createShowMoreButtonTemplate()));
renderElement(filmsSectionElement, createElement(createFilmListTemplate(topRated)));
renderElement(filmsSectionElement, createElement(createFilmListTemplate(mostCommented)));
renderElement(document.body, createElement(createFilmDetailsTemplate()));
