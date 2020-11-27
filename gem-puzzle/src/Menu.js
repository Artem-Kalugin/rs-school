export default class Menu {
  constructor() {
    this.elements = {
      wrapperElement: null,
      menuElement: null,
      resumeButton: null,
      newGameButton: null,
      savedGameButton: null,
      recordsButton: null,
      fieldSizeSelector: null,
      inputElement: null,
    };
    this.links = {
      GemPuzzle: null,
      form: null,
      controlsPanel: null,
    };
    this.savedTime = 0;
  }

  setUpLinks(gemPuzzle, form, controlsPanel) {
    this.links.GemPuzzle = gemPuzzle;
    this.links.form = form;
    this.links.controlsPanel = controlsPanel;
  }

  init() {
    this.elements.wrapperElement = document.createElement('div');
    this.elements.menuElement = document.createElement('div');
    this.elements.resumeButton = document.createElement('span');
    this.elements.newGameButton = document.createElement('span');
    this.elements.savedGameButton = document.createElement('span');
    this.elements.recordsButton = document.createElement('span');
    this.elements.fieldSizeSelector = document.createElement('select');
    const imageCheck = document.createElement('label');
    this.elements.inputElement = document.createElement('input');
    this.elements.inputElement.type = 'checkbox';
    imageCheck.innerText = 'IMAGE';
    imageCheck.appendChild(this.elements.inputElement);

    // Setup main elements
    this.elements.wrapperElement.classList.add('wrapper');
    this.elements.newGameButton.innerText = 'New Game';

    this.elements.newGameButton.addEventListener('click', () => { this.startNewGame(); });
    this.elements.savedGameButton.addEventListener('click', () => { this.loadSaved(); });
    this.elements.recordsButton.addEventListener('click', () => { this.showRecords(); });
    this.elements.resumeButton.addEventListener('click', () => {
      this.links.GemPuzzle.toggleHide();
      this.links.controlsPanel.toggleHide();
      this.toggleHide();
    });

    this.elements.savedGameButton.innerText = 'Saved Game';
    this.elements.recordsButton.innerText = 'Records';
    this.elements.resumeButton.innerText = 'Resume';
    this.elements.resumeButton.style.display = 'none';
    this.elements.menuElement.classList.add('menu');
    this.elements.fieldSizeSelector.setAttribute('size', '1');
    const option = document.createElement('option');
    option.innerText = '3x3';
    option.setAttribute('value', '3');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    option.innerText = '4x4';
    option.setAttribute('value', '4');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    option.innerText = '5x5';
    option.setAttribute('value', '5');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    option.innerText = '6x6';
    option.setAttribute('value', '6');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    option.innerText = '7x7';
    option.setAttribute('value', '7');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    option.innerText = '8x8';
    option.setAttribute('value', '8');
    this.elements.fieldSizeSelector.appendChild(option.cloneNode(true));
    this.elements.fieldSizeSelector.value = '4';

    // Add to DOM
    this.elements.menuElement.appendChild(this.elements.resumeButton);
    this.elements.menuElement.appendChild(this.elements.newGameButton);
    this.elements.menuElement.appendChild(this.elements.savedGameButton);
    this.elements.menuElement.appendChild(this.elements.recordsButton);
    this.elements.menuElement.appendChild(this.elements.fieldSizeSelector);
    this.elements.menuElement.appendChild(imageCheck);
    this.elements.wrapperElement.appendChild(this.elements.menuElement);
    document.body.appendChild(this.elements.wrapperElement);
  }

  showRecords() {
    this.links.form.init();
    this.links.form.addRecordsToForm();
    this.links.form.showForm();
  }

  loadSaved() {
    if (localStorage.getItem('savedGame') === null) {
      this.links.form.init();
      this.links.form.showMessage('Нет сохраненной игры!');
    } else {
      const savedGame = JSON.parse(localStorage.getItem('savedGame'));
      this.links.GemPuzzle.properties.exists = false;
      this.links.controlsPanel.properties.time = savedGame.time;
      this.links.controlsPanel.properties.steps = savedGame.steps;
      this.links.GemPuzzle.instanceProperties.gameField = savedGame.gameField;
      this.links.GemPuzzle.properties.size = savedGame.size;
      this.links.GemPuzzle.instanceProperties.isNewGame = false;
      this.links.GemPuzzle.instanceProperties.image = savedGame.image;
      this.links.GemPuzzle.instanceProperties.containImage = savedGame.containImage;
      this.startNewGame();
    }
  }

  startNewGame() {
    if (this.links.GemPuzzle.properties.exists) {
      this.links.GemPuzzle.clearInstance();
      this.links.controlsPanel.deletePanel();
    }
    if (this.links.GemPuzzle.instanceProperties.isNewGame) {
      this.links.GemPuzzle.properties.size = this.elements.fieldSizeSelector.value;
    }
    this.links.GemPuzzle.instanceProperties.containImage = this.elements.inputElement.checked;
    this.toggleHide();
    this.links.controlsPanel.init();
    this.links.GemPuzzle.initInstance();
  }

  toggleHide() {
    if (this.links.GemPuzzle.properties.exists) {
      if (this.elements.menuElement.classList.contains('hide_element')) {
        this.links.controlsPanel.stopTimer();
      } else {
        this.links.controlsPanel.countTime();
      }
    }
    if (this.links.GemPuzzle.properties.exists) this.elements.resumeButton.style.display = 'inline';
    else this.elements.resumeButton.style.display = 'none';
    this.elements.menuElement.classList.toggle('hide_element');
  }
}
