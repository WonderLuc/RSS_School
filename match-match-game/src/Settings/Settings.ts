import Component from '../Component';

require('./style.scss');

export class Settings implements Component {
  root: HTMLElement;

  constructor() {
    this.root = document.createElement('article');
    this.root.classList.add('settings');
  }

  render(): HTMLElement {
    this.root.innerHTML = `
    <form>
      <label class="setting" for="setting_card">
        Game Cards
        <input class="setting__input" list="setting_card-list"
               name="cards" id="setting_card" placeholder="select game card type">
        <datalist id="setting_card-list">
          <option value="default"></option>
        </datalist>
      </label>
      <label class="setting" for="setting_difficulty">
        Difficulty
        <input class="setting__input" list="setting_difficulty-list"
              name="difficulty" id="setting_difficulty" placeholder="select game type">
        <datalist id="setting_difficulty-list">
          <option value="16">16</option>
        </datalist>
      </label>
    </form>
    `;
    return this.root;
  }
}
