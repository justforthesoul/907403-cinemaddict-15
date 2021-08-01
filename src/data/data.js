import dayjs from 'dayjs';
import {getRandomizedFilmCard} from '../fake-data/film-card';
import {getRandomizedComment} from '../fake-data/comment';
import {appState} from '../app-state';

const FILM_CARD_COUNT = 20;
const COMMENTS_COUNT = 20;
const DESCRIPTION_COUNT = 140;
const EXTRA_COUNT = 2;

const createFilmCardFakeData = () => {
  const filmCards = [];
  for (let i = 0; i < FILM_CARD_COUNT; i++) {
    filmCards.push(getRandomizedFilmCard(i));
  }
  return filmCards;
};

const returnCurrentComments = (comments, indexes) => {
  const currentComments = [];
  indexes.forEach((index) => {
    currentComments.push(comments[index - 1]);
  });

  return currentComments;
};

const createCommentFakeData = () => {
  const comments = [];
  for (let i = 0; i < COMMENTS_COUNT; i++) {
    comments.push(getRandomizedComment(i));
  }
  return comments;
};

const filmCardFakeData = createFilmCardFakeData();
const commentFakeData = createCommentFakeData();
appState.allFilmsCounter = filmCardFakeData.length;

const trimmingDescription = (desc) => {
  if (desc.length >= DESCRIPTION_COUNT) {
    return `${desc.substring(0, DESCRIPTION_COUNT - 1)}...`;
  }
  return desc;
};

const formatRuntime = (runtime) => {
  const hours = Math.trunc(runtime/60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const createAllCommentsData = () => {
  return commentFakeData.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      author: item.author,
      comment: item.comment,
      date: dayjs(item.date).format('YYYY/MM/DD HH:mm'),
      emotion: item.emotion,
    };
    return acc;
  }, {});
};

const createAllFilmCardsData = () => {
  return filmCardFakeData.reduce((acc, item, index) => {
    acc[index] = {
      id: item.id,
      poster: item.film_info.poster,
      watchList: item.user_details.watchlist,
      alreadyWatched: item.user_details.already_watched,
      favorite: item.user_details.favorite,
      title: item.film_info.title,
      totalRating: item.film_info.total_rating,
      releaseYear: dayjs(item.film_info.release.date).format('YYYY'),
      runtime: formatRuntime(item.film_info.runtime),
      genre: item.film_info.genre.join(', '),
      description: trimmingDescription(item.film_info.description),
      comments: item.comments.length,
    };
    return acc;
  }, []);
};

const createAllFilmPopupData = () => {
  return filmCardFakeData.reduce((acc, item) => {
    acc[item.id] = {
      poster: item.film_info.poster,
      ageRating: item.film_info.age_rating,
      watchList: item.user_details.watchlist,
      alreadyWatched: item.user_details.already_watched,
      favorite: item.user_details.favorite,
      title: item.film_info.title,
      alternativeTitle: item.film_info.alternative_title,
      totalRating: item.film_info.total_rating,
      director: item.film_info.director,
      writers: item.film_info.writers.join(', '),
      actors: item.film_info.actors.join(', '),
      releaseDate: dayjs(item.film_info.release.date).format('DD MMMM YYYY'),
      releaseCountry: item.film_info.release.release_country,
      runtime: formatRuntime(item.film_info.runtime),
      genre: item.film_info.genre,
      description: item.film_info.description,
      comments: returnCurrentComments(createAllCommentsData(), item.comments),
    };
    return acc;
  }, {});
};

export const allFilmCardsData = createAllFilmCardsData();
export const allFilmPopupData = createAllFilmPopupData();
export const watchListCardsData = allFilmCardsData.slice().filter((filmCard) => filmCard.watchList);
export const historyCardsData = allFilmCardsData.slice().filter((filmCard) => filmCard.alreadyWatched);
export const favoritesCardsData = allFilmCardsData.slice().filter((filmCard) => filmCard.favorite);
export const topRatedFilmCardsData = allFilmCardsData.slice().sort((a, b) => b.totalRating - a.totalRating).slice(0, EXTRA_COUNT);
export const mostCommentedFilmCardsData = allFilmCardsData.slice().sort((a, b) => b.comments - a.comments).slice(0, EXTRA_COUNT);
export const filtersData = {
  watchList: watchListCardsData.length,
  history: historyCardsData.length,
  favorites: favoritesCardsData.length,
};
