interface RouteTemp {
  path: string;
  html: string;
}

class Route implements RouteTemp {
  path: string;

  html: string;

  constructor(path: string, html: string) {
    this.path = path;
    this.html = html;
  }
}

const routes = [
  new Route('', '<p>Garage</p>'),
  new Route('winners', '<p>Winners</p>'),
  new Route('404', '<p>Error 404</p>'),
];

export { routes, RouteTemp, Route };
