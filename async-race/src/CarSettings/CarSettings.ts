import { state, CarInterface } from '../State/State';

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
    const carData = await this.generateCarData(e);
    if (carData) {
      const req = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify(carData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (req.ok && isLast) {
        document.dispatchEvent(new CustomEvent('carsUpdated'));
      }
    }
  }

  async updateCar(): Promise<void> {
    this.name = '';
    const req = await fetch(
      `http://127.0.0.1:3000/garage/${state.updateCarData?.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(state.updateCarData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (req.ok) {
      document.dispatchEvent(new CustomEvent('carsUpdated'));
    }
  }

  generateCarData(e?: Event): CarInterface | undefined {
    return !e ? this.carFromCode() : this.carFromInputs();
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

  addListeners(): void {
    // Listener for create car
    this.container
      .querySelector('.btn-car_new')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        this.addCar(true, e);
      });
    // Listener for generate car
    this.container
      .querySelector('.controls__btn_generate')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < 99; i++) {
          this.addCar(false);
        }
        this.addCar(true);
      });
    // listener for fill update
    document.addEventListener('selectedCar', () => {
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
    });
    // Listener for new name field
    this.container
      .querySelector('.car-name_new')
      ?.addEventListener('input', (e) => {
        const elem = e.target;
        if (elem instanceof HTMLInputElement) {
          state.newCarData = { ...state.newCarData, name: elem.value };
        }
      });
    // Listener for new color field
    this.container
      .querySelector('.color-picker_new')
      ?.addEventListener('input', (e) => {
        const elem = e.target;
        if (elem instanceof HTMLInputElement) {
          state.newCarData = { ...state.newCarData, color: elem.value };
        }
      });
    // Listener for update name field
    this.container
      .querySelector('.car-name_update')
      ?.addEventListener('input', (e) => {
        const elem = e.target;
        if (elem instanceof HTMLInputElement) {
          if (state.updateCarData) {
            state.updateCarData = { ...state.updateCarData, name: elem.value };
          }
        }
      });
    // Listener for update color field
    this.container
      .querySelector('.color-picker_update')
      ?.addEventListener('input', (e) => {
        const elem = e.target;
        if (elem instanceof HTMLInputElement) {
          if (state.updateCarData) {
            state.updateCarData = { ...state.updateCarData, color: elem.value };
          }
        }
      });
    // listener for update car
    this.container
      .querySelector('.btn-car_update')
      ?.addEventListener('click', () => {
        this.updateCar();
      });
    // listener for Race
    this.container
      .querySelector('.controls__btn_race')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('raceStart'));
      });
    // listener for Reset
    this.container
      .querySelector('.controls__btn_reset')
      ?.addEventListener('click', (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('raceReset'));
      });
  }
}
