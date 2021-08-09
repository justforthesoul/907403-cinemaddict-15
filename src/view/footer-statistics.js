import AbstractComponent from './abstract-component';

const footerStatisticsTemplate = (data) => `<p>${new Intl.NumberFormat('ru-RU').format(data.length)} movies inside</p>`;

export default class FooterStatistics extends AbstractComponent {
  constructor (allFilmCardsData) {
    super();
    this._allFilmCardsData = allFilmCardsData;
  }

  getTemplate() {
    return footerStatisticsTemplate(this._allFilmCardsData);
  }
}
