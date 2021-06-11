import CarSettings from '../CarSettings/CarSettings';
import { Car, CarInterface } from '../Car/Car';

require('./style.scss');

export default class Garage {
  container: HTMLElement;

  carSettings: HTMLElement;

  carsArray: Car[];

  isUpdateble: boolean;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('garage');
    this.carSettings = new CarSettings().init();
    this.carsArray = [];
    this.isUpdateble = true;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      ${this.carSettings.outerHTML}
      <h2>Garage (${this.carsArray.length})</h2>
      <section class="cars"></section>
    `;
    this.carsArray.forEach((car: Car) => {
      this.container.querySelector('.cars')?.append(car.render());
    });
    return this.container;
  }

  async getCars(): Promise<void> {
    const req = await fetch('http://127.0.0.1:3000/garage');
    if (req.ok) {
      const res = await req.json();
      this.carsArray = res.map((car: CarInterface) => new Car(car));
    }
  }

  async update(): Promise<void> {
    await this.getCars();
  }
}
