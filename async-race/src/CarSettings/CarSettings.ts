import { Api } from '../Api/Api';
import { state } from '../State/State';
import { CarInterface, ICarSettings } from '../types';

require('./style.scss');

const sixFForRGB = 16777215;
const maxIdNumber = 100000000;

export default class CarSettings implements ICarSettings {
  container: HTMLElement;

  name: string;

  carData: CarInterface | undefined;

  constructor() {
    this.container = document.createElement('form');
    this.container.classList.add('car-settings');
    this.name = '';
    this.carData = undefined;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
    <fieldset class="new-car">
      <input class="car-name car-name_new" type="text"
      value="${state.newCarData?.name ? state.newCarData?.name : ''}" 
      >
      <input class="color-picker color-picker_new" type="color" value=
      "${state.newCarData?.color ? state.newCarData?.color : '#FFFFFF'}" 
      >
      <button class="btn-car btn-car_new">Create</button>
    </fieldset>
    <fieldset class="update-car" 
      ${state.updateCarData?.id ? `data-id="${state.updateCarData?.id}"` : ''}
    >
      <input class="car-name car-name_update" type="text" 
        value="${state.updateCarData?.name ? state.updateCarData?.name : ''}" 
        ${state.updateCarData?.name ? '' : 'disabled'}
      >
      <input class="color-picker color-picker_update" type="color" 
      value=
      "${state.updateCarData?.color ? state.updateCarData?.color : '#FFFFFF'}" 
        ${state.updateCarData?.color ? '' : 'disabled'}
      >
      <button class="btn-car btn-car_update" 
        ${state.updateCarData?.id ? '' : 'disabled'}
      >Update</button>
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

  async addCar(isLast: boolean, e?: Event): Promise<void> {
    this.carData = await this.generateCarData(e);
    if (this.carData) {
      const req = await Api.addCar(this);
      if (req.ok && isLast) {
        document.dispatchEvent(new CustomEvent('carsUpdated'));
      }
    }
  }

  generateCarData(e?: Event): CarInterface | undefined {
    return !e ? this.carFromCode() : this.carFromInputs();
  }

  carFromCode(): CarInterface {
    this.generateName();
    const color = `#${Math.floor(Math.random() * sixFForRGB).toString(16)}`;
    const id: number = Math.round(Math.random() * maxIdNumber);
    return {
      name: this.name,
      color,
      id,
    };
  }

  generateName(): void {
    const brand = [
      'Tesla',
      'Ford',
      'Ferrari',
      'Mitsubishi',
      'Dads',
      'Kia',
      'BMW',
      'Audi',
      'Lada',
      'Toyota',
    ];

    const model = [
      'Y',
      'Mustang',
      'Spider',
      'Lancer',
      'Glory',
      'Rio',
      'x5',
      'A7',
      'Vedro',
      'Land-Cruiser',
    ];
    const name = `${brand[Math.floor(Math.random() * 10)]} ${
      model[Math.floor(Math.random() * 10)]
    }`;
    this.name = name;
  }

  carFromInputs(): CarInterface | undefined {
    if (!state.newCarData.name || !state.newCarData.color) {
      return undefined;
    }
    this.name = state.newCarData.name;
    const id: number = Math.round(Math.random() * 100000000);
    return {
      name: state.newCarData.name,
      color: state.newCarData.color,
      id,
    };
  }

  createCarHandler(e: Event): void {
    e.preventDefault();
    this.addCar(true, e);
  }

  generateCarsHandler(e: Event): void {
    e.preventDefault();
    for (let i = 0; i < 99; i++) {
      this.addCar(false);
    }
    this.addCar(true);
  }

  fillUpdateHandler(): void {
    this.name = `${this.name}`;
    if (state.updateCarData) {
      const { name, color, id } = state.updateCarData;
      const parent = document.querySelector('.update-car');
      if (parent) {
        const nameField: HTMLInputElement | null =
          parent.querySelector('.car-name_update');
        if (nameField) {
          nameField.value = name;
          nameField.removeAttribute('disabled');
        }
        const colorField: HTMLInputElement | null = parent.querySelector(
          '.color-picker_update'
        );
        if (colorField) {
          colorField.value = color;
          colorField.removeAttribute('disabled');
        }
        const button = parent.querySelector('.btn-car_update');
        if (button) button.removeAttribute('disabled');
        parent.setAttribute('data-id', `${id}`);
      }
    }
  }

  newNameFieldHandler(e: Event): void {
    this.name = `${this.name}`;
    const elem = e.target;
    if (elem instanceof HTMLInputElement) {
      state.newCarData = { ...state.newCarData, name: elem.value };
    }
  }

  newColorFieldHandler(e: Event): void {
    this.name = `${this.name}`;
    const elem = e.target;
    if (elem instanceof HTMLInputElement) {
      state.newCarData = { ...state.newCarData, color: elem.value };
    }
  }

  updateNameFieldHandler(e: Event): void {
    this.name = `${this.name}`;
    const elem = e.target;
    if (elem instanceof HTMLInputElement) {
      if (state.updateCarData) {
        state.updateCarData = { ...state.updateCarData, name: elem.value };
      }
    }
  }

  updateColorFieldHandler(e: Event): void {
    this.name = `${this.name}`;
    const elem = e.target;
    if (elem instanceof HTMLInputElement) {
      if (state.updateCarData) {
        state.updateCarData = { ...state.updateCarData, color: elem.value };
      }
    }
  }

  raceStartHandler(e: Event): void {
    this.name = `${this.name}`;
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('raceStart'));
  }

  raceResetHandler(e: Event): void {
    this.name = `${this.name}`;
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('raceReset'));
  }

  addListeners(): void {
    this.container
      .querySelector('.btn-car_new')
      ?.addEventListener('click', this.createCarHandler.bind(this));

    this.container
      .querySelector('.controls__btn_generate')
      ?.addEventListener('click', this.generateCarsHandler.bind(this));

    document.addEventListener('selectedCar', this.fillUpdateHandler.bind(this));

    this.container
      .querySelector('.car-name_new')
      ?.addEventListener('input', this.newNameFieldHandler.bind(this));

    this.container
      .querySelector('.color-picker_new')
      ?.addEventListener('input', this.newColorFieldHandler.bind(this));

    this.container
      .querySelector('.car-name_update')
      ?.addEventListener('input', this.updateNameFieldHandler.bind(this));

    this.container
      .querySelector('.color-picker_update')
      ?.addEventListener('input', this.updateColorFieldHandler.bind(this));

    this.container
      .querySelector('.btn-car_update')
      ?.addEventListener('click', () => {
        Api.updateCar();
      });

    this.container
      .querySelector('.controls__btn_race')
      ?.addEventListener('click', this.raceStartHandler.bind(this));

    this.container
      .querySelector('.controls__btn_reset')
      ?.addEventListener('click', this.raceResetHandler.bind(this));
  }
}
