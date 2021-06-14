import CarSettings from '../CarSettings/CarSettings';
import { Car, CarInterface } from '../Car/Car';

require('./style.scss');

export default class Garage {
  container: HTMLElement;

  carSettings: CarSettings;

  carsArray: Car[];

  isUpdateble: boolean;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('garage');
    this.carSettings = new CarSettings();
    this.carsArray = [];
    this.isUpdateble = true;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <h2>Garage (<span class="car-count">${this.carsArray.length}</span>)</h2>
      <section class="cars"></section>
    `;
    this.renderCars();
    this.container.querySelector('h2')?.before(this.carSettings.render());
    document.addEventListener('carsUpdated', async () => {
      await this.update();
      await this.updateCarsCount();
      await this.updateCarsRender();
    });
    return this.container;
  }

  renderCars(): void {
    this.carsArray.forEach((car: Car) => {
      this.container.querySelector('.cars')?.append(car.render());
    });
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

  async updateCarsRender(): Promise<void> {
    const cars = this.container.querySelector('.cars');
    if (cars) {
      cars.innerHTML = '';
      this.renderCars();
    }
  }

  async updateCarsCount(): Promise<void> {
    const countElem = this.container.querySelector('.car-count');
    if (countElem) {
      countElem.innerHTML = `${this.carsArray.length}`;
    }
  }
}
