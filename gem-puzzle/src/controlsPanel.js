export default class ControlsPanel {
  constructor() {
    this.elements = {
      wrapper: null,
      timeElement: null,
      stepsElement: null,
      saveButton: null,
      retryButton: null,
      loseButton: null,
      soundButton: null,
      pauseButton: null,
      imageCheck: null,
    };
    this.properties = {
      time: 0,
      steps: 0,
      timeId: 0,
    };
    this.links = {
      menu: null,
      GemPuzzle: null,
      form: null,
    };
  }

  setUpLinks(menu, GemPuzzle, form) {
    this.links.GemPuzzle = GemPuzzle;
    this.links.menu = menu;
    this.links.form = form;
  }

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.saveButton = document.createElement('span');
    this.elements.retryButton = document.createElement('span');
    this.elements.soundButton = document.createElement('span');
    this.elements.timeElement = document.createElement('span');
    this.elements.stepsElement = document.createElement('span');
    this.elements.pauseButton = document.createElement('span');

    this.elements.stepsElement.innerText = this.properties.steps;

    this.elements.saveButton.innerHTML = '<i class="fas fa-save">';
    this.elements.retryButton.innerHTML = '<i class="fas fa-undo">';
    this.elements.soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    this.elements.pauseButton.innerHTML = '<i class="far fa-pause-circle"></i>';

    this.elements.retryButton.addEventListener('click', () => { this.generateNewInstance(); });
    this.elements.saveButton.addEventListener('click', () => { this.saveInstance(); });
    this.elements.soundButton.addEventListener('click', () => { this.toggleSound(); });
    this.elements.pauseButton.addEventListener('click', () => {
      this.links.GemPuzzle.toggleHide();
      this.toggleHide();
      this.links.menu.toggleHide();
    });

    this.elements.wrapper.appendChild(this.elements.timeElement);
    this.elements.wrapper.appendChild(this.elements.retryButton);
    this.elements.wrapper.appendChild(this.elements.saveButton);
    this.elements.wrapper.appendChild(this.elements.soundButton);
    this.elements.wrapper.appendChild(this.elements.stepsElement);
    this.elements.wrapper.appendChild(this.elements.pauseButton);

    this.elements.wrapper.classList.add('flex');

    document.body.appendChild(this.elements.wrapper);
    this.countTime();
  }

  toggleSound() {
    const soundIcon = this.elements.soundButton.querySelector('.fas');
    soundIcon.classList.toggle('fa-volume-up');
    soundIcon.classList.toggle('fa-volume-mute');
    this.links.GemPuzzle.properties.sounds = !this.links.GemPuzzle.properties.sounds;
  }

  saveInstance() {
    const savedGame = {
      time: this.properties.time,
      steps: this.properties.steps,
      size: this.links.GemPuzzle.properties.size,
      gameField: this.links.GemPuzzle.instanceProperties.gameField,
      image: this.links.GemPuzzle.instanceProperties.image,
      containImage: this.links.GemPuzzle.instanceProperties.containImage,
    };
    localStorage.setItem('savedGame', JSON.stringify(savedGame));
  }

  generateNewInstance() {
    this.links.GemPuzzle.clearInstance();
    this.links.GemPuzzle.initInstance();
  }

  countTime() {
    this.elements.timeElement.innerText = `${this.constructor.addZero(Math.floor(this.properties.time / 60))}:${this.constructor.addZero(this.properties.time % 60)}`;
    this.properties.time += 1;
    this.properties.timeId = setTimeout(() => { this.countTime(); }, 1000);
  }

  increaseSteps() {
    this.properties.steps += 1;
    this.elements.stepsElement.innerText = this.properties.steps;
  }

  stopTimer() {
    clearTimeout(this.properties.timeId);
  }

  deletePanel() {
    this.stopTimer();
    this.elements.wrapper.remove();
  }

  static addZero(num) {
    if (num < 10) return `0${num}`;
    return num;
  }

  toggleHide() {
    this.elements.wrapper.classList.toggle('hide_element');
  }
}
