export default class ErrorPage {
  container: HTMLElement;

  isUpdateble: boolean;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('404');
    this.isUpdateble = false;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
    <h2>404</h2>
    <p>${Math.random() * 100}</p>
    `;
    return this.container;
  }

  async update(): Promise<boolean> {
    return this.isUpdateble;
  }
}
