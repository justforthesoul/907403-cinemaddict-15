import {
  allFilmCardsData,
  watchListCardsData,
  topRatedFilmCardsData,
  mostCommentedFilmCardsData,
  filtersData,
  allFilmPopupData
} from './data/data';
import {render, remove} from './utils/render';
import ProfileRatingView from './view/profile-rating';
import SiteMenuView from './view/site-menu';
import SortView from './view/sort';
import FilmsSectionView from './view/films-section';
import FilmListView from './view/film-list';
import FilmCardView from './view/film-card';
import ShowMoreButtonView from './view/show-more-button';
import FilmDetailsView from './view/film-details';
import FooterStatisticsView from './view/footer-statistics';
import {isEscEvent} from './utils/helper';

const CARD_COUNTER = 5;
let cardShown = 0;
const filmsSectionComponent = new FilmsSectionView();

const renderMainComponents = () => {
  const siteHeaderElement = document.querySelector('.header');
  const siteMainElement = document.querySelector('.main');
  const footerStatisticsElement = document.querySelector('.footer__statistics');

  if (watchListCardsData.length) {
    render(siteHeaderElement, new ProfileRatingView(watchListCardsData.length));
  }

  render(siteMainElement, new SiteMenuView(filtersData));
  render(siteMainElement, new SortView());
  render(siteMainElement, filmsSectionComponent);
  render(footerStatisticsElement, new FooterStatisticsView(allFilmCardsData.length));
};

const renderFilmCards = () => {
  if (!allFilmCardsData.length) {
    render(filmsSectionComponent, new FilmListView('empty'));
    return;
  }

  const baseCardsComponent = new FilmListView('base');
  render(filmsSectionComponent, baseCardsComponent);

  const onFilmCardClick = (id) => {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }

    const filmDetailsComponent = new FilmDetailsView(allFilmPopupData[id]);
    render(document.body, filmDetailsComponent);

    const closePopup = () => {
      document.body.classList.remove('hide-overflow');
      remove(filmDetailsComponent);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    const onDocumentKeydown = (evt) => {
      if (isEscEvent(evt)) {
        closePopup();
      }
    };

    filmDetailsComponent.setCloseHandler(closePopup);
    document.addEventListener('keydown', onDocumentKeydown);
    document.body.classList.add('hide-overflow');
  };

  const renderCard = (data, element) => {
    const filmCardComponent = new FilmCardView(data);
    render(element.getElement().querySelector('.films-list__container'), filmCardComponent);
    filmCardComponent.setClickHandler(onFilmCardClick);
  };

  const renderCards = () => {
    const startCard = cardShown;
    const stopCard = cardShown = CARD_COUNTER + cardShown < allFilmCardsData.length ? CARD_COUNTER + cardShown : allFilmCardsData.length;
    for (let index = startCard; index < stopCard; index++) {
      renderCard(allFilmCardsData[index], baseCardsComponent);
    }
  };

  renderCards();

  if (cardShown < allFilmCardsData.length) {
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsSectionComponent, showMoreButtonComponent);

    showMoreButtonComponent.setClickHandler(() => {
      renderCards();
      if (cardShown === allFilmCardsData.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  const topRatedComponent = new FilmListView('topRated');
  render(filmsSectionComponent, topRatedComponent);
  topRatedFilmCardsData.forEach((card) => {
    renderCard(card, topRatedComponent);
  });

  const mostCommentedComponent = new FilmListView('mostCommented');
  render(filmsSectionComponent, mostCommentedComponent);
  mostCommentedFilmCardsData.forEach((card) => {
    renderCard(card, mostCommentedComponent);
  });
};

renderMainComponents();
renderFilmCards();
