export const getRandomNumber = (min, max, places = 0) => {
  const randomNumber = Math.random() * (max - min + 1) + min;
  return places ? randomNumber.toFixed(places): Math.floor(randomNumber);
};

export const getRandomBoolean = () => {
  return !!Math.round(Math.random());
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
