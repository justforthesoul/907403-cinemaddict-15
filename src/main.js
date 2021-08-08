import {
  allFilmCardsData,
  topRatedFilmCardsData,
  mostCommentedFilmCardsData,
  filtersData,
  allFilmPopupData
} from './data/data';
import {renderElement} from './utils/render';
import ProfileRatingView from './view/profile-rating';
import SiteMenuView from './view/site-menu';
import SortView from './view/sort';
import FilmsSectionView from './view/films-section';
import FilmListView from './view/film-list';
import FilmCardView from './view/film-cards';
import ShowMoreButtonView from './view/show-more-button';
import FilmDetails from './view/film-details';
import FooterStatisticsView from './view/footer-statistics';
import {appState} from './app-state';
import {isEscEvent} from './utils/helper';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

renderElement(headerElement, new ProfileRatingView().getElement());
renderElement(mainElement, new SiteMenuView(filtersData).getElement());
renderElement(mainElement, new SortView().getElement());
renderElement(mainElement, new FilmsSectionView().getElement());

const filmsSectionElement = document.querySelector('.films');

if (!appState.allFilmsCounter) {
  renderElement(filmsSectionElement, new FilmListView('empty').getElement());
} else {
  const baseCardsView = new FilmListView('base').getElement();
  renderElement(filmsSectionElement, baseCardsView);

  if (appState.cardShown < appState.allFilmsCounter) {
    const showMoreButtonView = new ShowMoreButtonView();
    renderElement(filmsSectionElement, showMoreButtonView.getElement());

    const renderMainCards = () => {
      const {cardIntoView, cardShown, allFilmsCounter} = appState;
      const startCard = cardShown;
      const stopCard = cardIntoView + cardShown < allFilmsCounter ? cardIntoView + cardShown : allFilmsCounter;
      appState.cardShown = appState.cardShown + appState.cardIntoView < allFilmsCounter ? appState.cardIntoView + appState.cardShown : allFilmsCounter;
      for (let index = startCard; index < stopCard; index++) {
        renderElement(baseCardsView.querySelector('.films-list__container'), new FilmCardView(allFilmCardsData[index]).getElement());
      }
    };

    renderMainCards();

    const checkShowMoreButtonState = () => {
      if (appState.cardShown === appState.allFilmsCounter) {
        showMoreButtonView.removeClickHandler(onShowMoreButtonClick);
        showMoreButtonView.getElement().remove();
      }
    };

    const onShowMoreButtonClick = (evt) => {
      evt.preventDefault();
      renderMainCards();
      checkShowMoreButtonState();
    };

    showMoreButtonView.setClickHandler(onShowMoreButtonClick);
  }

  const topRatedView = new FilmListView('topRated').getElement();
  renderElement(filmsSectionElement, topRatedView);
  topRatedFilmCardsData.forEach((card) => {
    renderElement(topRatedView.querySelector('.films-list__container'), new FilmCardView(card).getElement());
  });

  const mostCommentedView = new FilmListView('mostCommented').getElement();
  renderElement(filmsSectionElement, mostCommentedView);
  mostCommentedFilmCardsData.forEach((card) => {
    renderElement(mostCommentedView.querySelector('.films-list__container'), new FilmCardView(card).getElement());
  });

  renderElement(footerStatisticsElement, new FooterStatisticsView().getElement());

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
      renderElement(document.body, new FilmDetails(allFilmPopupData[currentId]).getElement());
      document.addEventListener('keydown', onDocumentKeydown);
    }

    if (target.closest('.film-details__close-btn')) {
      closePopup();
    }
  };

  document.addEventListener('click', onDocumentClick);
}
