import AbstractComponent from './abstract-component';
import {appState} from '../app-state';

const footerStatisticsTemplate = () => `<p>${new Intl.NumberFormat('ru-RU').format(appState.allFilmsCounter)} movies inside</p>`;

export default class FooterStatistics extends AbstractComponent {
  getTemplate() {
    return footerStatisticsTemplate();
  }
}
