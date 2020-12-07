import Statistics from './Statistics';

export default class PlayMode {
  constructor(toggler, cardsContainer) {
    this.getState();
    this.sound = {
      correct: new Audio('./assets/audio/correct.mp3'),
      incorrect: new Audio('./assets/audio/incorrect.mp3'),
      win: new Audio('./assets/audio/win.mp3'),
      lose: new Audio('./assets/audio/lose.mp3'),
    };
    cardsContainer.element.addEventListener('CardClick', (e) => {
      if (this.isStarted && e.detail.currentMode !== 'inactive') {
        const expectedCard = this.cardsContainer.cards[this.gameProperties.targetCardArray[0]];
        if (e.detail.title === expectedCard.properties.enTitle) {
          this.sound.correct.currentTime = 0;
          this.sound.correct.play();
          this.cardsContainer.cards[this.gameProperties.targetCardArray[0]].setMode('inactive');
          this.gameProperties.targetCardArray.shift();
          Statistics.mutateStatistics(e.detail.title, 'correct');
          this.addCorrectEl();
          this.checkWin();
        } else {
          this.gameProperties.incorrect += 1;
          this.sound.incorrect.currentTime = 0;
          this.sound.incorrect.play();
          Statistics.mutateStatistics(e.detail.title, 'incorrect');
          this.addIncorrectEl();
        }
      }
    });
    this.cardsContainer = cardsContainer;
    toggler.addEventListener('click', () => {
      document.querySelector('.toggle').classList.toggle('play');
      this.getState();
      this.setIndicatorVisibility();
      this.setGameState();
    });
  }

  initElements() {
    this.elements = {
      button: document.querySelector('.game-indicator__control'),
      score: document.querySelector('.game-score__container'),
    };
    this.elements.button.addEventListener('click', () => {
      if (!this.isStarted) {
        this.startGame();
      } else {
        this.play();
      }
    });
  }

  setIndicatorVisibility() {
    if (this.mode === 'play' && !this.cardsContainer.element.classList.contains('hide')) {
      document.querySelector('.game-indicator').classList.remove('hide');
    } else {
      document.querySelector('.game-indicator').classList.add('hide');
    }
  }

  getState() {
    if (document.querySelector('.toggle').classList.contains('play')) {
      this.mode = 'play';
      this.initElements();
    } else {
      this.mode = 'train';
      this.endGame();
    }
  }

  checkWin() {
    if (this.gameProperties.targetCardArray.length > 0) {
      setTimeout(() => {
        this.play();
      }, 1000);
    } else {
      const message = this.setMessage();
      PlayMode.showMessage(message);
      setTimeout(() => {
        this.endGame();
        message.remove();
        document.querySelector('.game-wrapper').classList.remove('hide');
        document.querySelector('.main-title').dispatchEvent(new Event('mouseup'));
      }, 3000);
    }
  }

  static showMessage(message) {
    document.querySelector('.game-wrapper').classList.add('hide');
    document.querySelector('.footer').before(message);
  }

  setMessage() {
    const message = document.createElement('div');
    const messageSmile = document.createElement('div');
    const messageText = document.createElement('span');

    message.classList.add('message');
    messageSmile.classList.add('message__smile');
    messageText.classList.add('message__text');

    message.append(messageSmile);
    message.append(messageText);

    if (this.gameProperties.incorrect) {
      this.sound.lose.play();
      message.classList.add('message_lose');
      messageText.innerText = `Try better, you did ${this.gameProperties.incorrect} mistakes!`;
    } else {
      this.sound.win.play();
      message.classList.add('message_win');
      messageText.innerText = 'Congratulations! You win!';
    }

    return message;
  }

  play() {
    this.cardsContainer.cards[this.gameProperties.targetCardArray[0]].properties.sound.play();
  }

  setGameState() {
    this.cardsContainer.setMode(this.mode);
  }

  endGame() {
    this.isStarted = false;
    this.gameProperties = null;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.score.innerHTML = '';
      this.elements.button.classList.remove('fa-undo');
      this.elements.button.classList.add('fa-play');
    }
  }

  addCorrectEl() {
    const el = document.createElement('div');
    el.classList.add('score', 'game-score__correct', 'fas', 'fa-check');
    this.elements.score.prepend(el);
  }

  addIncorrectEl() {
    const el = document.createElement('div');
    el.classList.add('score', 'game-score__incorrect', 'fas', 'fa-times');
    this.elements.score.prepend(el);
  }

  startGame() {
    const gameProperties = {
      correct: 0,
      incorrect: 0,
      targetCardArray: [],
    };
    this.gameProperties = gameProperties;
    this.isStarted = true;
    this.shuffleCards();
    this.play();
    this.elements.button.classList.remove('fa-play');
    this.elements.button.classList.add('fa-undo');
  }

  shuffleCards() {
    this.gameProperties.targetCardArray = [...Array(this.cardsContainer.cards.length).keys()]; // source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    for (let i = this.gameProperties.targetCardArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.gameProperties.targetCardArray[i];
      this.gameProperties.targetCardArray[i] = this.gameProperties.targetCardArray[j];
      this.gameProperties.targetCardArray[j] = temp;
    } // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  }
}
