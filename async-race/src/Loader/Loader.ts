require('./style.scss');

export default class Loader {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('loader');
  }

  render(): HTMLElement {
    this.container.innerHTML = `
    <div class="loader-inner semi-circle-spin">
      <div></div>
    </div>
    `;
    return this.container;
  }
}
