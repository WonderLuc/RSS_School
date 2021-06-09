import Garage from './Garage/Garage';
import Winners from './Winners/Winners';
import ErrorPage from './ErrorPage/ErrorPage';

interface RouteTemp {
  path: string;
  component: Garage | ErrorPage | Winners;
}

class Route implements RouteTemp {
  path: string;

  component: Garage | ErrorPage | Winners;

  constructor(path: string, component: Garage | ErrorPage | Winners) {
    this.path = path;
    this.component = component;
  }
}

const routes = [
  new Route('404', new ErrorPage()),
  new Route('', new Garage()),
  new Route('winners', new Winners()),
];

export { routes, RouteTemp, Route };
