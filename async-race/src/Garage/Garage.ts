import CarSettings from '../CarSettings/CarSettings';
import Car from '../Car/Car';
import { CarInterface, state } from '../State/State';
import Loader from '../Loader/Loader';

require('./style.scss');

export default class Garage {
  container: HTMLElement;

  carSettings: CarSettings;

  carsArray: Car[];

  currentCars: Car[];

  isUpdateble: boolean;

  loader: HTMLElement;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('garage');
    this.carSettings = new CarSettings();
    this.carsArray = [];
    this.currentCars = [];
    this.isUpdateble = true;
    this.loader = new Loader().render();
    document.addEventListener('carsUpdated', () => this.carsUpdatedHandler());
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <h2>Garage (<span class="car-count">${this.carsArray.length}</span>)</h2>
      <h3>Page <span class="car-count">${state.garagePage + 1}</span></h3>
      <section class="cars"></section>
      <div class="pagination">
        <button class="pagination__btn pagination__btn_prev" 
        ${state.garagePage <= 0 ? 'disabled' : ''}
        > Previous</button>
        <button class="pagination__btn pagination__btn_next"
        ${state.garagePage >= this.carsArray.length / 7 - 1 ? 'disabled' : ''}
        > Next</button>
      </div>
    `;
    this.renderCars();
    this.container.querySelector('h2')?.before(this.carSettings.render());
    this.addListeners();
    return this.container;
  }

  renderCars(): void {
    this.currentCars.forEach((car: Car) => {
      this.container.querySelector('.cars')?.append(car.render());
    });
  }

  async getCars(): Promise<void> {
    const req = await fetch('http://127.0.0.1:3000/garage');
    if (req.ok) {
      const res = await req.json();
      this.carsArray = res.map((car: CarInterface) => new Car(car));
      this.currentCars = this.carsArray.slice(
        state.garagePage * 7,
        state.garagePage * 7 + 7
      );
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

  async carsUpdatedHandler(): Promise<void> {
    this.container.querySelector('.cars')?.append(this.loader);
    await this.update();
    await this.updateCarsCount();
    await this.updateCarsRender();
    this.loader.remove();
  }

  toNextPage(): void {
    state.garagePage += 1;
    this.currentCars = this.carsArray.slice(
      state.garagePage * 7,
      state.garagePage * 7 + 7
    );
  }

  toPrevPage(): void {
    state.garagePage -= 1;
    this.currentCars = this.carsArray.slice(
      state.garagePage * 7,
      state.garagePage * 7 + 7
    );
  }

  addListeners(): void {
    // listener for paginaton next
    this.container
      .querySelector('.pagination__btn_next')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        this.toNextPage();
        this.render();
      });
    // listener for paginaton prev
    this.container
      .querySelector('.pagination__btn_prev')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        this.toPrevPage();
        this.render();
      });
  }
}
