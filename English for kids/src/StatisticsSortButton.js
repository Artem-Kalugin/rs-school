import Statistics from './Statistics';

export default class StatisticsSortButton {
  constructor(el, sortValue) {
    this.isSorted = false;
    this.sortProperty = sortValue;
    el.addEventListener('click', () => {
      if (this.sortProperty !== 'percents') this.sort(Statistics.load());
      else {
        const stat = Statistics.getPercentage(Statistics.load());
        this.sort(stat);
      }
    });
  }

  sort(statistics) {
    Statistics.removeStatElements();
    statistics.sort((a, b) => {
      let compareRes;
      if (a[this.sortProperty] > b[this.sortProperty]) {
        compareRes = 1;
      }
      if (a[this.sortProperty] < b[this.sortProperty]) {
        compareRes = -1;
      }
      if (a[this.sortProperty] === b[this.sortProperty]) {
        compareRes = 0;
      }
      if (Number.isNaN(a)) compareRes = -2;
      if (Number.isNaN(b)) compareRes = 2;
      return this.isSorted ? -1 * compareRes : compareRes;
    });
    this.isSorted = !this.isSorted;
    Statistics.generateStatistics(statistics, true);
  }
}
