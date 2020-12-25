import Statistics from './Statistics';
import placeIcon from './placeIcon';

export default class Card {
  playSound() {
    this.properties.sound.play();
  }

  constructor(enTitle, enSubtitle, rusTitle, soundURL, imageURL, parent = document.body) {
    const properties = {
      enTitle: '',
      enSubtitle: '',
      rusTitle: '',
      sound: null,
      imageURL: '',
      isRotated: false,
    };
    this.mode = 'train';
    this.properties = properties;
    this.updateObjProperties(enTitle, enSubtitle, rusTitle, soundURL, imageURL);
    this.createCard(parent);
    this.setMode(this.mode);
    this.updateCardProperties();
  }

  updateObjProperties(enTitle, enSubtitle, rusTitle, soundURL, imageURL) {
    this.properties.enTitle = enTitle;
    this.properties.enSubtitle = enSubtitle;
    this.properties.rusTitle = rusTitle;
    this.properties.sound = new Audio(`${soundURL}`);
    this.properties.imageURL = imageURL;
    if (this.elements !== undefined) {
      this.elements.wrapperElement.classList.remove('hide');
      this.updateCardProperties();
      this.setMode(this.mode);
    }
  }

  updateObjPropertiesFromObj(newCard, cardsCategory) {
    this.updateObjProperties(newCard.word, cardsCategory, newCard.translation, `./assets/${newCard.audioSrc}`, `./assets/${newCard.image}`);
  }

  setMode(mode = 'train') {
    this.elements.wrapperElement.classList.remove('card_inactive');
    this.mode = mode;
    const hideable = this.elements.wrapperElement.querySelectorAll('.hideable');
    this.setEvent();
    if (mode === 'train') {
      hideable.forEach((el) => {
        el.classList.remove('hide');
      });
      this.properties.event = () => {
        this.playSound();
        Statistics.mutateStatistics(this.properties.enTitle, 'trainClicks');
      };
    }
    if (mode === 'play') {
      hideable.forEach((el) => {
        el.classList.add('hide');
      });
      this.properties.event = () => this.elements.wrapperElement.dispatchEvent(this.myEvent);
    }
    if (mode === 'inactive') {
      this.elements.wrapperElement.classList.add('card_inactive');
    }
  }

  setEvent() {
    this.myEvent = new CustomEvent('CardClick', {
      detail: {
        title: this.properties.enTitle,
        currentMode: this.mode,
      },
      bubbles: true,
    }); // https://learn.javascript.ru/dispatch-events
  }

  updateCardProperties() {
    this.elements.subtitleElement.innerText = this.properties.enSubtitle;
    this.elements.titleElement.innerText = this.properties.enTitle;
    this.elements.backfaceTitleElement.innerText = this.properties.rusTitle;
    this.elements.imageElement.style.backgroundImage = `url("${this.properties.imageURL}")`;
    this.elements.backfaceImageElement.style.backgroundImage = `url("${this.properties.imageURL}")`;
    this.setEvent();
  }

  rotateCard() {
    this.properties.isRotated = !this.properties.isRotated;
    this.elements.faceElement.classList.toggle('card__front_rotated');
    this.elements.backfaceElement.classList.toggle('card__back_rotated');
  }

  createCard(parent) {
    const elements = {
      wrapperElement: null,
      titleElement: null,
      faceElement: null,
      backfaceElement: null,
      backfaceTitleElement: null,
      backfaceSubtitleElement: null,
      subtitleElement: null,
      imageElement: null,
      backfaceImageElement: null,
    };
    elements.wrapperElement = document.createElement('div');
    elements.wrapperElement.classList.add('card');
    elements.wrapperElement.addEventListener('mouseleave', () => {
      if (this.properties.isRotated) this.rotateCard();
    });

    elements.faceElement = document.createElement('div');
    elements.faceElement.classList.add('card__front');

    elements.backfaceElement = document.createElement('div');
    elements.backfaceElement.classList.add('card__back', 'card__back_rotated');

    elements.imageElement = document.createElement('div');
    elements.imageElement.classList.add('card__image');

    const cardElementsContainer = document.createElement('div');
    cardElementsContainer.classList.add('card__elements');
    const backfaceCardDescription = cardElementsContainer.cloneNode();

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('card__description');
    const backfaceDescriptionElement = descriptionElement.cloneNode();

    elements.titleElement = document.createElement('h5');
    elements.titleElement.classList.add('card__title');

    elements.subtitleElement = document.createElement('h6');
    elements.subtitleElement.classList.add('card__subtitle');

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('card__button');

    let soundButtonElement = 0;
    buttonElement.addEventListener('mousedown', () => {
      buttonElement.classList.toggle('card__button_clicked');
    });
    buttonElement.addEventListener('mouseup', () => {
      buttonElement.classList.toggle('card__button_clicked');
    });
    if (this.properties.enSubtitle !== 'Category') {
      cardElementsContainer.classList.add('hideable');
      soundButtonElement = document.createElement('button');
      soundButtonElement.classList.add('card__side-button', 'hideable');
      soundButtonElement = placeIcon(soundButtonElement, 'volume-up');
      buttonElement.classList.add('button_blue');
      buttonElement.innerText = 'Перевернуть';
      buttonElement = placeIcon(buttonElement, 'undo');
      buttonElement.addEventListener('click', () => {
        this.rotateCard();
      });
      elements.faceElement.addEventListener('click', () => this.properties.event());
    } else {
      elements.wrapperElement.classList.add('category');
      buttonElement.classList.add('button_orange');
      buttonElement.innerText = 'Выбрать';
      buttonElement = placeIcon(buttonElement, 'hand-pointer', 'far');
    }
    descriptionElement.appendChild(elements.titleElement);
    descriptionElement.appendChild(elements.subtitleElement);
    cardElementsContainer.appendChild(descriptionElement);
    cardElementsContainer.appendChild(buttonElement);
    if (soundButtonElement !== 0) elements.imageElement.appendChild(soundButtonElement);
    elements.faceElement.appendChild(elements.imageElement);
    elements.faceElement.appendChild(cardElementsContainer);
    elements.wrapperElement.appendChild(elements.faceElement);

    elements.backfaceSubtitleElement = elements.subtitleElement.cloneNode();
    elements.backfaceTitleElement = elements.titleElement.cloneNode();
    elements.backfaceImageElement = elements.imageElement.cloneNode();
    backfaceDescriptionElement.appendChild(elements.backfaceTitleElement);
    backfaceDescriptionElement.appendChild(elements.backfaceSubtitleElement);
    backfaceCardDescription.appendChild(backfaceDescriptionElement);
    elements.backfaceElement.appendChild(elements.backfaceImageElement);
    elements.backfaceElement.appendChild(backfaceCardDescription);

    elements.wrapperElement.appendChild(elements.backfaceElement);

    parent.appendChild(elements.wrapperElement);
    this.elements = elements;
  }
}
