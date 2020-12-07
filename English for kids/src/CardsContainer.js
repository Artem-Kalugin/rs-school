import CardsData from './assets/cards';
import Card from './Card';
import Staticstics from './Statistics';
import CategoryHandler from './CategoryHandler';

export default class CardsContainer {
  constructor(container) {
    this.element = container;
  }

  createCards() {
    this.cards = [];
    CardsData[1].forEach((el) => {
      this.cards.push(new Card(el.word, CardsData[0][0], el.translation, `./assets/${el.audioSrc}`, `./assets/${el.image}`, this.element));
    });
  }

  createCategory() {
    this.cards = [];
    this.categoryIndex = 0;
    CardsData[0].forEach((el, index) => {
      this.cards.push(new Card(el, 'Category', '', `./assets/${CardsData[index + 1][0].audioSrc}`, `./assets/${CardsData[index + 1][0].image}`, this.element));
    });
  }

  updateCards(categoryIndex) {
    this.categoryIndex = categoryIndex;
    this.cards.forEach((el, index) => {
      el.updateObjPropertiesFromObj(CardsData[categoryIndex + 1][index],
        CardsData[0][categoryIndex]);
    });
  }

  generateWorstCards() {
    const indexesOfWorst = Staticstics.getIndexOfWorstCards();
    this.cards.forEach((el) => {
      el.elements.wrapperElement.classList.add('hide');
    });
    indexesOfWorst.forEach((el, index) => {
      this.cards[index].updateObjPropertiesFromObj(CardsData[el.rowIndex + 1][
        el.colIndex], CardsData[0][el.rowIndex]);
    });
    CategoryHandler.toggleContainer(this);
  }

  setMode(mode) {
    this.cards.forEach((el) => {
      el.setMode(mode);
    });
  }
}
