import Component from '../Component';
import NewUser from '../NewUser/NewUser';
import gearsIcon from '../../assets/gearIcon.svg';
import gameExample from '../../assets/gameExample.png';

require('./style.scss');

export default class About implements Component {
  root: HTMLElement;

  constructor() {
    this.root = document.createElement('article');
    this.root.classList.add('about');
  }

  render(): HTMLElement {
    this.root.innerHTML = `
    <h2 class="about__header">How to play?</h2>
    <section class="stage">
      <div class="stage__info">
        <p class="digit-wrapper">1</p>
        <h3 class="info__text">Register new player in game</h3>
      </div>
      ${new NewUser().render().innerHTML}
    </section>
    <section class="stage">
      <div class="stage__info">
        <p class="digit-wrapper">2</p>
        <h3 class="info__text">Configure your game settings</h3>
      </div>
      <figure class="settings-button">
        <img class="settings-button__image" src=${gearsIcon} alt="gear">
        <h3 class="settings-button__text">Game Settings</h3>
      </figure>
    </section>
    <section class="stage">
      <div class="stage__info">
        <p class="digit-wrapper">3</p>
        <h3 class="info__text">Start you new game! Remember card positions and match it before times up.</h3>
      </div>
      <figure class="game-example">
        <img class="game-example__image" src=${gameExample} alt="game example">
      </figure>
    </section>
    `;
    return this.root;
  }
}
