import Router from '../Router/Router';

require('./style.scss');

export default class Header {
  container: HTMLElement;

  router: Router;

  activeElem: HTMLElement | undefined;

  constructor(router: Router) {
    this.container = document.createElement('header');
    this.container.classList.add('header');
    this.router = router;
    this.activeElem = undefined;
  }

  setActive(): void {
    // Set active link or remove if it's 404 request
    const elem: HTMLElement | null = document.querySelector(
      `.nav__element[data-src="${this.router.currentHash}"]`
    );
    if (!elem) return;
    if (!this.activeElem) {
      this.activeElem = elem;
      this.activeElem.classList.add('nav__element_active');
      return;
    }
    this.activeElem.classList.remove('nav__element_active');
    elem.classList.add('nav__element_active');
    this.activeElem = elem;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <ul class="nav">
        <li class="nav__element" data-src="">Garage</li>
        <li class="nav__element" data-src="winners">Winners</li>
      </ul>
    `;
    this.container.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      const elem = e.target;
      this.router.changeRoute(`${elem.dataset.src}`);
      this.setActive();
    });
    return this.container;
  }
}
