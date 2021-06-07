import { Route } from '../routes';

export default class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
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
    root.innerHTML = elem.html;
  }

  findRoute(name: string): Route {
    return this.routes.filter((el) => {
      return name === el.path;
    })[0];
  }

  changeRoute(name: string): void {
    window.location.hash = `/${name}`;
    const elem = this.findRoute(name);
    const root = document.getElementById('root');
    if (!root) {
      return;
    }
    root.innerHTML = elem.html;
  }
}
