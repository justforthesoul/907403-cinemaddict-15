import AbstractComponent from './abstract-component';

const footerStatisticsTemplate = (counter) => `<p>${new Intl.NumberFormat('ru-RU').format(counter)} movies inside</p>`;

export default class FooterStatistics extends AbstractComponent {
  constructor (allFilmCardsData) {
    super();
    this._allFilmCardsData = allFilmCardsData;
  }

  getTemplate() {
    return footerStatisticsTemplate(this._allFilmCardsData);
  }
}
