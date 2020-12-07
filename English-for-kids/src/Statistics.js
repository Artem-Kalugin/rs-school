import CardsData from './assets/cards';

export default class Staticstics {
  static initialize() {
    let statistics = Staticstics.load();
    if (statistics === null) {
      statistics = Staticstics.setStatStructure();
    }
    Staticstics.save(statistics);
  }

  static load() {
    return JSON.parse(localStorage.getItem('statisticsArtemKaluginRepo'));
  }

  static save(statistics) {
    localStorage.setItem('statisticsArtemKaluginRepo', JSON.stringify(statistics));
  }

  static delete() {
    localStorage.removeItem('statisticsArtemKaluginRepo');
  }

  static mutateStatistics(word, wordMode) {
    const statistics = Staticstics.load();
    const index = statistics.findIndex((el) => {
      if (el.word === word) return true;
      return false;
    });
    statistics[index][wordMode] += 1; // source: https://stackoverflow.com/questions/2274242/how-to-use-a-variable-for-a-key-in-a-javascript-object-literal
    this.save(statistics);
  }

  static setStatStructure() {
    let cards = CardsData;
    const statistics = [];
    cards = CardsData.slice(1);
    cards = cards.flat();// source: MDN
    cards.forEach((el, index) => {
      statistics.push({
        word: el.word,
        trainClicks: 0,
        correct: 0,
        incorrect: 0,
        percents: null,
        rowIndex: Math.floor(index / 8),
        colIndex: index % 8,
      });
    });
    return statistics;
  }

  static generateStatistics(statistics, isSorted) {
    const categories = CardsData[0];
    const container = document.createElement('div');
    container.classList.add('statistics__container');
    statistics.forEach((el, index) => {
      if (!(index % 8) && !isSorted) {
        const category = this.generateStatisticsElement(categories[index / 8]);
        category.classList.add('category');
        container.append(category);
      }
      container.append(this.generateStatisticsElement(el.word));
      container.append(this.generateStatisticsElement(el.trainClicks));
      container.append(this.generateStatisticsElement(el.correct));
      container.append(this.generateStatisticsElement(el.incorrect));
      const correctPerc = document.createElement('div');
      correctPerc.classList.add('statistics__el');
      const percents = Math.floor((el.correct / (el.incorrect + el.correct)) * 100);
      correctPerc.innerText = Number.isNaN(percents) ? '-' : `${percents}%`;
      container.append(correctPerc);
    });
    Staticstics.showStatistics(container);
  }

  static generateStatisticsElement(innerText) {
    const el = document.createElement('div');
    el.classList.add('statistics__el');
    el.innerText = innerText;
    return el;
  }

  static getPercentage(statistics) {
    statistics.map((el) => {
      const percents = Math.floor((el.correct / (el.incorrect + el.correct)) * 100);
      el.percents = percents;
      if (Number.isNaN(percents)) el.percents = -1;
      return el;
    });
    return statistics;
  }

  static getIndexOfWorstCards() {
    let statistics = this.getPercentage(this.load());
    statistics = statistics.filter((el) => el.percents !== -1);
    statistics.sort((a, b) => a.percents - b.percents);
    statistics = statistics.filter((el) => el.percents !== 100);
    if (statistics.length > 8) {
      statistics.length = 8;
    }
    const indexes = [];
    statistics.forEach((el) => {
      indexes.push({
        rowIndex: el.rowIndex,
        colIndex: el.colIndex,
      });
    });
    return indexes;
  }

  static removeStatElements() {
    if (document.querySelector('.statistics__container')) {
      document.querySelector('.statistics__container').remove();
    }
  }

  static showStatistics(message) {
    if (document.querySelector('.statistics')) {
      document.querySelector('.statistics').classList.remove('hide');
      document.querySelector('.statistics__reset').before(message);
    }
  }

  static hideStatistics() {
    document.querySelector('.statistics').classList.add('hide');
  }
}
