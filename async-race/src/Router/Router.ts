import { Route } from '../routes';

export default class Router {
  routes: Route[];

  currentHash: string;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.currentHash = window.location.hash.slice(2);
    window.addEventListener('popstate', () => {
      this.popStateHandler();
    });
    window.addEventListener('load', () => {
      this.popStateHandler();
    });
  }

  popStateHandler(): void {
    const name = window.location.hash.slice(2);
    const elem = this.findRoute(name);
    const root = document.getElementById('root');
    if (!root) {
      return;
    }
    if (!elem) {
      root.innerHTML = this.findRoute('404').html;
      return;
    }
    this.currentHash = name;
    root.innerHTML = elem.html;
  }

  findRoute(name: string): Route {
    return this.routes.filter((el) => {
      return name === el.path;
    })[0];
  }

  changeRoute(name: string): void {
    window.location.hash = `/${name}`;
    this.currentHash = name;
    const elem = this.findRoute(name);
    const root = document.getElementById('root');
    if (!root) {
      return;
    }
    root.innerHTML = elem.html;
  }
}
