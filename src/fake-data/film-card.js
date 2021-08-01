import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {getRandomNumber, getRandomBoolean} from '../utils/helper';

dayjs.extend(dayjsRandom);

const filmCardTitles = [
  'Made for each other',
  'Popeye Meets Sinbad',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];
const commentsId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const filmCardDescriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.',  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];
const filmCardGenres = ['Drama', 'Film-Noir', 'Mystery', 'Western', 'Musical', 'Comedy', 'Cartoon', 'Mystery'];
const filmCardDirectors = ['Tom Ford', 'John Cromwell', 'Jennifer Aniston', 'Thomas Vinterberg', 'Taylor Dooley'];
const filmCardWriters = ['Takeshi Kitano', 'Werner Herzog', 'Miles Teller', 'Diane Lane', 'Peter Stormare', 'Jack Black',];
const filmCardActors = [ 'Morgan Freeman', 'Matilda De Angelis', 'Kevin Hart', 'Amanda Collin', 'Ji Chang-wook', 'Neslihan Atagül', 'Mark Dacascos', 'Tim Robbins'];
const filmCardCountry = ['Finland', 'USA', 'France', 'China', 'USSR', 'England', 'Germany'];

export const getRandomizedFilmCard = (index) => {
  const filmCardTitle = filmCardTitles[getRandomNumber(0, filmCardTitles.length - 1)];

  return {
    id: index,
    comments: [...new Set(new Array(getRandomNumber(0, 19)).fill('').map(() => commentsId[getRandomNumber(0, commentsId.length - 1)]))],
    film_info: {
      title: filmCardTitle,
      alternative_title: filmCardTitle,
      total_rating: getRandomNumber(0, 9, 1),
      poster: `images/posters/${filmCardTitle.toLowerCase().split(' ').join('-')}.jpg`,
      age_rating: getRandomNumber(0, 18),
      director: filmCardDirectors[getRandomNumber(0, filmCardDirectors.length - 1)],
      writers: [...new Set(new Array(getRandomNumber(1, 3)).fill('').map(() => filmCardWriters[getRandomNumber(0, filmCardWriters.length - 1)]))],
      actors: [...new Set(new Array(getRandomNumber(1, 5)).fill('').map(() => filmCardActors[getRandomNumber(0, filmCardActors.length - 1)]))],
      release: {
        date: dayjs.past(100).format(),
        release_country: filmCardCountry[getRandomNumber(0, filmCardCountry.length - 1)],
      },
      runtime: getRandomNumber(60, 180),
      genre: [...new Set(new Array(getRandomNumber(1, 3)).fill('').map(() => filmCardGenres[getRandomNumber(0, filmCardGenres.length - 1)]))],
      description: new Array(getRandomNumber(1, 5)).fill('').map(() => filmCardDescriptions[getRandomNumber(0, filmCardDescriptions.length - 1)]).join(' '),
    },
    user_details: {
      watchlist: getRandomBoolean(),
      already_watched: getRandomBoolean(),
      watching_date: dayjs.past(100).format(),
      favorite: getRandomBoolean(),
    },
  };
};
