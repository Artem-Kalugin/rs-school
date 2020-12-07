import './style.scss';
import '../node_modules/normalize.css/normalize.css';
import Menu from './Menu';
import CardsContainer from './CardsContainer';
import CategoryHandler from './CategoryHandler';
import PlayMode from './PlayMode';
import Statistics from './Statistics';
import StatisticsSortButton from './StatisticsSortButton';

const menu = new Menu();
const cardsContainer = new CardsContainer(document.querySelector('.cards-container'));
const categoryContainer = new CardsContainer(document.querySelector('.category-container'));
cardsContainer.createCards();
categoryContainer.createCategory();
const playMode = new PlayMode(document.querySelector('.toggle__check'), cardsContainer);
CategoryHandler.add(categoryContainer, cardsContainer, playMode);
CategoryHandler.addMenuListener(menu, cardsContainer, playMode);
const mainTitle = document.querySelector('.main-title');
mainTitle.addEventListener('mouseup', () => {
  Statistics.removeStatElements();
  Statistics.hideStatistics();
  CategoryHandler.clearMenuLinks(menu);
  document.querySelector('.game-wrapper').classList.remove('hide');
  document.querySelector('.menu__link-main').classList.add('menu__link_active');
  if (categoryContainer.element.classList.contains('hide')) CategoryHandler.toggleContainer(cardsContainer);
});
document.querySelector('.statistics__repeat').addEventListener('click', () => {
  document.querySelector('.game-wrapper').classList.remove('hide');
  cardsContainer.generateWorstCards();
  Statistics.removeStatElements();
  Statistics.hideStatistics();
});
document.querySelector('.statistics__reset').addEventListener('click', () => {
  Statistics.removeStatElements();
  Statistics.delete();
  Statistics.initialize();
  Statistics.generateStatistics(Statistics.load(), false);
});
Statistics.initialize();
const statButtons = Array.from(document.querySelector('.statistics__head').querySelectorAll('.statistics__el'));
statButtons[0] = new StatisticsSortButton(statButtons[0], 'word');
statButtons[1] = new StatisticsSortButton(statButtons[1], 'trainClicks');
statButtons[2] = new StatisticsSortButton(statButtons[2], 'correct');
statButtons[3] = new StatisticsSortButton(statButtons[3], 'incorrect');
statButtons[4] = new StatisticsSortButton(statButtons[4], 'percents');
// eslint-disable-next-line no-alert
alert('Привет, в таске реализован весь функционал. Для старта игры в режиме Play надо нажать на соответсвующую кнопку на панели справа. Удачи в проверке :)');
