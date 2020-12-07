export default class Menu {
  constructor() {
    this.button = document.querySelectorAll('.menu-button');
    this.element = document.querySelector('.nav');
    this.overlay = document.querySelector('.overlay');
    this.button.forEach((el) => {
      el.addEventListener('click', () => this.toggleMenu());
    });
    this.overlay.addEventListener('click', () => this.toggleMenu());
  }

  toggleMenu() {
    this.element.classList.toggle('nav_active');
    this.overlay.classList.toggle('overlay_active');
    document.body.classList.toggle('stop-scroll');
  }
}
