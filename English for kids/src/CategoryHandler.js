import Statistics from './Statistics';

export default class CategoryHandler {
  static add(target, cardsContainer, playMode, isOneSide = false) {
    this.playMode = playMode;
    target.element.addEventListener('mouseup', (event) => {
      const eventContainer = event.target.closest('.category');
      if (eventContainer) {
        this.toggleContainer(cardsContainer, isOneSide);
        cardsContainer.updateCards(Array.from(target.element.querySelectorAll('.category')).indexOf(eventContainer)); // source: stackoverflow partially
      }
    });
  }

  static addMenuListener(menu, cardsContainer, playMode) {
    this.add(menu, cardsContainer, playMode, true);
    menu.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('menu__link')) {
        this.clearMenuLinks(menu);
        event.target.classList.add('menu__link_active');
        menu.toggleMenu();
      }
      if (event.target.classList.contains('menu__link-main')) {
        if (!cardsContainer.element.classList.contains('hide')
        || document.querySelector('.game-wrapper').classList.contains('hide')) {
          this.toggleContainer(cardsContainer);
        }
      }
      if (event.target.classList.contains('menu__link-statistics')) {
        Statistics.removeStatElements();
        Statistics.generateStatistics(Statistics.load());
        document.querySelector('.game-wrapper').classList.add('hide');
      }
    });
  }

  static clearMenuLinks(menu) {
    const categoryElements = menu.element.querySelectorAll('.menu__link');
    categoryElements.forEach((el) => {
      el.classList.remove('menu__link_active');
    });
  }

  static toggleContainer(cardsContainer, isOneSide = false) {
    const categoryContainer = document.querySelector('.category-container');
    if (isOneSide) {
      categoryContainer.classList.remove('hide');
      cardsContainer.element.classList.remove('hide');
      categoryContainer.classList.add('hide');
    } else {
      categoryContainer.classList.toggle('hide');
      cardsContainer.element.classList.toggle('hide');
    }
    this.playMode.setIndicatorVisibility();
    this.playMode.setGameState();
    this.playMode.endGame();
    document.querySelector('.game-wrapper').classList.remove('hide');
    Statistics.removeStatElements();
    Statistics.hideStatistics();
  }
}
