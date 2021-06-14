import { CarInterface } from '../Car/Car';

require('./style.scss');

export default class CarSettings {
  container: HTMLElement;

  name: string;

  constructor() {
    this.container = document.createElement('form');
    this.container.classList.add('car-settings');
    this.name = '';
  }

  render(): HTMLElement {
    this.container.innerHTML = `
    <fieldset class="new-car">
      <input class="car-name car-name_new" type="text">
      <input class="color-picker color-picker_new" type="color" value="#FFFFFF">
      <button class="btn-car btn-car_new">Create</button>
    </fieldset>
    <fieldset class="update-car">
      <input class="car-name car-name_update" type="text">
      <input class="color-picker color-picker_update" type="color" value="#FFFFFF">
      <button class="btn-car btn-car_update">Update</button>
    </fieldset>
    <fieldset class="controls">
      <button class="controls__btn controls__btn_race">Race</button>
      <button class="controls__btn controls__btn_reset">Reset</button>
      <button class="controls__btn controls__btn_generate">Generate Cars</button>
    </fieldset>
    `;
    this.addListeners();
    return this.container;
  }

  async addCar(e?: Event): Promise<void> {
    const carData = await this.generateCarData(e);
    if (carData) {
      const req = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify(carData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (req.ok) {
        document.dispatchEvent(new CustomEvent('carsUpdated'));
      }
    }
  }

  generateCarData(e?: Event): CarInterface | undefined {
    return !e ? this.carFromCode() : this.carFromInputs(e);
  }

  carFromCode(): CarInterface {
    this.generateName();
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const id: number = Math.round(Math.random() * 100000000);
    return {
      name: this.name,
      color,
      id,
    };
  }

  generateName(): void {
    const name = 'random';
    this.name = name;
  }

  carFromInputs(e: Event): CarInterface | undefined {
    // Takes inputs value and create carData
    e.preventDefault();
    if (e.target instanceof Element) {
      const parentContainer = e.target.parentElement;
      if (parentContainer === null) return undefined;
      // Gets name of car
      const name: HTMLInputElement | null =
        parentContainer.querySelector('.car-name');
      if (name?.value !== '') {
        this.name = name?.value ? name?.value : '';
      } else {
        this.generateName();
      }
      // Gets color
      const colorInput: HTMLInputElement | null =
        parentContainer.querySelector('.color-picker');
      const color = colorInput?.value ? colorInput.value : '';
      const id: number = Math.round(Math.random() * 100000000);
      return {
        name: this.name,
        color,
        id,
      };
    }
    return undefined;
  }

  addListeners(): void {
    this.container
      .querySelector('.btn-car_new')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        this.addCar(e);
      });
    this.container
      .querySelector('.controls__btn_generate')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < 99; i++) {
          this.addCar();
        }
      });
  }
}
