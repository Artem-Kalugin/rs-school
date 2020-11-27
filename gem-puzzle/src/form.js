export default class Form {
  constructor() {
    this.elements = {
      wrapperElement: null,
      closeButtonElement: null,
      containerElement: null,
      addElement: null,
    };
    this.links = {
      menu: null,
      gemPuzzle: null,
      controlsPanel: null,
    };
  }

  setUpLinks(menu, gemPuzzle, controlsPanel) {
    this.links.menu = menu;
    this.links.gemPuzzle = gemPuzzle;
    this.links.controlsPanel = controlsPanel;
  }

  init() {
    this.elements.wrapperElement = document.createElement('div');
    this.elements.containerElement = document.createElement('div');
    this.elements.closeButtonElement = document.createElement('button');

    this.elements.wrapperElement.classList.add('form-wrapper');
    this.elements.containerElement.classList.add('container');
    this.elements.closeButtonElement.classList.add('close-form-button');

    this.elements.closeButtonElement.innerText = 'OK';

    this.elements.closeButtonElement.addEventListener('click', () => { this.closeForm(); });

    this.elements.wrapperElement.appendChild(this.elements.containerElement);
    this.elements.wrapperElement.appendChild(this.elements.closeButtonElement);
  }

  addRecordsToForm() {
    if (localStorage.getItem('records') != null) {
      this.elements.addElement = document.createElement('div');
      this.elements.addElement.classList.add('records-grid');
      const textEl = document.createElement('span');
      textEl.innerText = 'Место';
      this.elements.addElement.appendChild(textEl.cloneNode(true));
      textEl.innerText = 'Время';
      this.elements.addElement.appendChild(textEl.cloneNode(true));
      textEl.innerText = 'Ходы';
      this.elements.addElement.appendChild(textEl.cloneNode(true));
      textEl.innerText = 'Размер';
      this.elements.addElement.appendChild(textEl.cloneNode(true));
      const records = JSON.parse(localStorage.getItem('records'));
      records.forEach((el, index) => {
        textEl.innerText = index + 1;
        this.elements.addElement.appendChild(textEl.cloneNode(true));
        textEl.innerText = el.time;
        this.elements.addElement.appendChild(textEl.cloneNode(true));
        textEl.innerText = el.steps;
        this.elements.addElement.appendChild(textEl.cloneNode(true));
        textEl.innerText = el.size;
        this.elements.addElement.appendChild(textEl.cloneNode(true));
      });
      this.elements.containerElement.appendChild(this.elements.addElement);
      this.showForm();
    } else {
      this.showMessage('Вы еще не прошли игру!');
      this.showForm();
    }
  }

  showMessage(message) {
    const messageEl = document.createElement('span');
    messageEl.innerText = message;
    this.elements.containerElement.appendChild(messageEl);
    this.showForm();
  }

  showForm() {
    document.querySelector('.wrapper').appendChild(this.elements.wrapperElement);
  }

  closeForm() {
    this.elements.wrapperElement.remove();
    this.elements.wrapperElement = null;
    this.elements.containerElement = null;
    this.elements.addElement = null;
  }
}
