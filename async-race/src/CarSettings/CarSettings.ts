require('./style.scss');

export default class CarSettings {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('form');
    this.container.classList.add('car-settings');
  }

  init(): HTMLElement {
    this.container.innerHTML = `
    <fieldset class="new-car">
      <input class="car-name car-name_new" type="text">
      <input class="color-picker color-picker_new" type="color" value="#FFFFFF">
      <button class="btn-car btn-car_new">Create</button>
    </fieldset>
    <fieldset class="update-car">
      <input class="car-name car-name_update" type="text">
      <input class="color-picker color-picker_update" type="color" value="#FFFFFF">
      <button class="btn-car btn-car_update">Update</button>
    </fieldset>
    <fieldset class="controls">
      <button class="controls__btn controls__btn_race">Race</button>
      <button class="controls__btn controls__btn_reset">Reset</button>
      <button class="controls__btn controls__btn_generate">Generate Cars</button>
    </fieldset>
    `;
    return this.container;
  }
}
