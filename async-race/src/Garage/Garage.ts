import CarSettings from '../CarSettings/CarSettings';
import Car from '../Car/Car';
import { state } from '../State/State';
import Loader from '../Loader/Loader';
import { CarInterface } from '../types';
import { Api } from '../Api/Api';
import { leafThroughtPage } from '../commonFunc';

require('./style.scss');

export default class Garage {
  container: HTMLElement;

  carSettings: CarSettings;

  carsArray: Car[];

  currentCars: Car[];

  isUpdateble: boolean;

  loader: HTMLElement;

  currentWinner: Car | undefined;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('garage');
    this.carSettings = new CarSettings();
    this.carsArray = [];
    this.currentCars = [];
    this.isUpdateble = true;
    this.loader = new Loader().render();
    this.currentWinner = undefined;
    document.addEventListener('carsUpdated', () => this.carsUpdatedHandler());
    document.addEventListener('raceStart', () => this.raceStartHandler());
    document.addEventListener('raceReset', () => this.raceResetHandler());
    document.addEventListener('finishedCar', () => this.finishedCarHandler());
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
      <h3 class="winner"></h3>
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

  async showCars(): Promise<void> {
    const cars = await Api.getCars();
    if (cars) {
      this.carsArray = cars.map((car: CarInterface) => new Car(car));
      this.currentCars = this.carsArray.slice(
        state.garagePage * 7,
        state.garagePage * 7 + 7
      );
    }
  }

  async update(): Promise<void> {
    await this.showCars();
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
    this.render();
  }

  async raceStartHandler(): Promise<void> {
    this.currentCars.forEach((car) => {
      car.carStart();
    });
  }

  async raceResetHandler(): Promise<void> {
    this.currentWinner = undefined;
    this.currentCars.forEach((car) => {
      car.carReset();
    });
  }

  async finishedCarHandler(): Promise<void> {
    if (!this.currentWinner) {
      let name: string | undefined;
      let time: number | undefined;
      this.currentCars.forEach((car) => {
        if (car.isFinsed) {
          this.currentWinner = this.currentWinner ? this.currentWinner : car;
          name = name || car.carData.name;
          time = time || car.rideTime;
          if (this.currentWinner?.rideTime && car.rideTime) {
            if (this.currentWinner.rideTime > car.rideTime) {
              this.currentWinner = car;
              name = car.carData.name;
              time = car.rideTime;
            }
          }
        }
      });
      const winnerSign = document.querySelector('.winner');
      if (winnerSign && time) {
        winnerSign.classList.add('winner_shown');
        winnerSign.innerHTML = `Win ${name} in ${time / 1000} seconds`;
        Api.sendWinner(this);
        setTimeout(() => {
          winnerSign?.classList.remove('winner_shown');
        }, 5000);
      }
    }
  }

  leafThroughtPageHandler(e: Event, isForward: boolean): void {
    e.preventDefault();
    leafThroughtPage('garagePage', isForward);
    this.currentCars = this.carsArray.slice(
      state.garagePage * 7,
      state.garagePage * 7 + 7
    );
    this.render();
    this.raceResetHandler();
  }

  addListeners(): void {
    this.container
      .querySelector('.pagination__btn_next')
      ?.addEventListener('click', (e) => {
        this.leafThroughtPageHandler.bind(this)(e, true);
      });

    this.container
      .querySelector('.pagination__btn_prev')
      ?.addEventListener('click', (e) => {
        this.leafThroughtPageHandler.bind(this)(e, false);
      });
  }
}
