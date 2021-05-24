import Component from '../Component';
import logo from '../../assets/logo.svg';
import questionIcon from '../../assets/questionIcon.svg';
import starIcon from '../../assets/starIcon.svg';
import gearIcon from '../../assets/gearIcon.svg';

require('./style.scss');

export default class Header implements Component {
  root: HTMLElement;

  currentActive: HTMLElement | undefined;

  constructor() {
    this.root = document.createElement('header');
    this.currentActive = undefined;
  }

  render(): HTMLElement {
    this.root.classList.add('header');
    this.root.innerHTML = `
    <figure>
      <img src=${logo} alt="logo ">
    </figure>
    <ul class="nav-list">
      <li class="nav-list__item">
        <figure class="icon">
          <img src=${questionIcon} alt="icon">
          <p>About Game</p>
        </figure>
      </li>
      <li class="nav-list__item">
        <figure class="icon">
          <img src=${starIcon} alt="icon">
          <p>Best Score</p>
        </figure>
      </li>
      <li class="nav-list__item">
        <figure class="icon">
          <img src=${gearIcon} alt="icon">
          <p>Game Settings</p>
        </figure>
      </li>
    </ul>
    <button class="register-button">Register New Player</button>
    `;
    this.root.addEventListener('click', (e) => {
      const { target } = e;
      if (
        target instanceof Element &&
        target.classList.contains('nav-list__item')
      ) {
        console.log('new Item!', target);
      }
    });
    return this.root;
  }

  setActive(active: HTMLElement): void {
    this.currentActive = active;
  }

  getActive(): HTMLElement | undefined {
    return this.currentActive;
  }
}
