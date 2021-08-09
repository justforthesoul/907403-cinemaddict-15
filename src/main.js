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
import FilmDetailsView from './view/film-details';
import FooterStatisticsView from './view/footer-statistics';
import {isEscEvent} from './utils/helper';


const CARD_COUNTER = 5;
const cardsLength = allFilmCardsData.length;
let cardShown = 0;

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

renderElement(headerElement, new ProfileRatingView().getElement());
renderElement(mainElement, new SiteMenuView(filtersData).getElement());
renderElement(mainElement, new SortView().getElement());
renderElement(mainElement, new FilmsSectionView().getElement());

const filmsSectionElement = document.querySelector('.films');

if (!cardsLength) {
  renderElement(filmsSectionElement, new FilmListView('empty').getElement());
} else {
  const baseCardsView = new FilmListView('base').getElement();
  renderElement(filmsSectionElement, baseCardsView);

  const closePopup = () => {
    document.body.classList.remove('hide-overflow');
    document.querySelector('.film-details').remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      closePopup();
    }
  };

  const onCloseButtonClick = () => {
    closePopup();
  };

  const onFilmCardClick = ({target}) => {
    if (target.closest('.film-card__poster')) {
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      const currentId = +target.closest('.film-card').dataset.id;
      const filmDetailsView = new FilmDetailsView(allFilmPopupData[currentId]).getElement();
      renderElement(document.body, filmDetailsView);
      document.addEventListener('keydown', onDocumentKeydown);
      filmDetailsView.querySelector('.film-details__close-btn').addEventListener('click', onCloseButtonClick);
      document.body.classList.add('hide-overflow');
    }
  };

  const renderCard = (data, element) => {
    const filmCardView = new FilmCardView(data);
    renderElement(element.querySelector('.films-list__container'), filmCardView.getElement());
    filmCardView.setClickHandler(onFilmCardClick);
  };

  const renderMainCards = () => {
    const startCard = cardShown;
    const stopCard = CARD_COUNTER + cardShown < cardsLength ? CARD_COUNTER + cardShown : cardsLength;
    cardShown = CARD_COUNTER + cardShown < cardsLength ? CARD_COUNTER + cardShown : cardsLength;
    for (let index = startCard; index < stopCard; index++) {
      renderCard(allFilmCardsData[index], baseCardsView);
    }
  };

  renderMainCards();

  if (cardShown < cardsLength) {
    const showMoreButtonView = new ShowMoreButtonView();
    renderElement(filmsSectionElement, showMoreButtonView.getElement());

    const checkShowMoreButtonState = () => {
      if (cardShown === cardsLength) {
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
    renderCard(card, topRatedView);
  });

  const mostCommentedView = new FilmListView('mostCommented').getElement();
  renderElement(filmsSectionElement, mostCommentedView);
  mostCommentedFilmCardsData.forEach((card) => {
    renderCard(card, mostCommentedView);
  });

  renderElement(footerStatisticsElement, new FooterStatisticsView(allFilmCardsData).getElement());
}
