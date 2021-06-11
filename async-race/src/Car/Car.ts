import flagIcon from '../../assets/finish.svg';

require('./style.scss');

export interface CarInterface {
  name: string;
  color: string;
  id: number;
}

export class Car {
  container: HTMLElement;

  carData: CarInterface;

  constructor(car: CarInterface) {
    this.carData = car;
    this.container = document.createElement('div');
    this.container.classList.add('car');
    this.container.dataset.id = `${this.carData.id}`;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <div class="car-controls">
        <button class="car-controls__btn car-controls__btn_select">Select</button>
        <button class="car-controls__btn car-controls__btn_remove">Remove</button>
        <h3 class="car__name">${this.carData.name}</h3> 
      </div>
      <div class="car-view">
        <button class="car-view__btn car-view__btn_start car-view__btn_active">A</button>
        <button class="car-view__btn car-view__btn_reset">B</button>
        <svg class="car-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
         <g id="_13-car" data-name="13-car">
           <g id="glyph" fill="${this.carData.color}">
            <path
              d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"/>
            <path 
              d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"/>
             <path 
               d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,
                 100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,
                 36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,
                 125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,
                 36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,
                 1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,
                 121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,
                 0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,
                 12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/>
            </g>
          </g>
        </svg>
        <img class="flag-img" src="${flagIcon}" alt="flag" width="40">
      </div> 
    `;
    return this.container;
  }
}
