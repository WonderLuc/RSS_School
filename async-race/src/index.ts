import Header from './Header/Header';
import Router from './Router/Router';
import { routes } from './routes';

require('../assets/commonStyles.scss');

class App {
  root: HTMLElement;

  header: Header | undefined;

  constructor() {
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    this.header = undefined;
  }

  init(): void {
    this.root.appendChild(document.createElement('p'));
    const router = new Router(routes);
    this.header = new Header(router);
    document.body.appendChild(this.header.render());
    this.header.setActive();
    document.body.append(this.root);
  }
}

const app: App = new App();
app.init();
