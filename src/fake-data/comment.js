import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {getRandomNumber} from '../utils/helper';
dayjs.extend(dayjsRandom);

const commentAuthors = ['Tim Macoveev', 'John Doe', 'Tom Ford', 'John Cromwell'];
const commentTexts = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];
const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];

export const getRandomizedComment = (index) => ({
  id: index,
  author: commentAuthors[getRandomNumber(0, commentAuthors.length - 1)],
  comment: commentTexts[getRandomNumber(0, commentTexts.length - 1)],
  date: dayjs.recent(30).format(),
  emotion: commentEmotions[getRandomNumber(0, commentEmotions.length - 1)],
});
