import {appState} from '../app-state';

export const footerStatisticsTemplate = () => {
  return `<p>${new Intl.NumberFormat('ru-RU').format(appState.allFilmsCounter)} movies inside</p>`;
};
