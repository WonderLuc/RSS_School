import { Api } from '../Api/Api';
import { IWinner, IWinnersData } from '../types';

require('./style.scss');

export default class Winner implements IWinner {
  container: HTMLElement;

  id: number;

  wins: number;

  time: number;

  name: string;

  color: string;

  index: number;

  constructor(winnnerData: IWinnersData) {
    this.container = document.createElement('tr');
    this.container.classList.add('winners__item');
    this.id = winnnerData.id;
    this.wins = winnnerData.wins;
    this.time = winnnerData.time;
    this.color = '';
    this.name = '';
    this.index = 0;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <td class="winner-number">${this.index}</td>
      <td class="winner-img">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
          <g id="_13-car" data-name="13-car">
            <g id="glyph" fill="${this.color}">
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
      </td>
      <td class="winner-name">${this.name}</td>
      <td class="winner-wins">${this.wins}</td>
      <td class="winner-time">${this.time}</td>
    `;
    return this.container;
  }

  async getWinnerData(): Promise<void> {
    await Api.getWinner(this);
  }

  setIndex(index: number): void {
    this.index = index + 1;
  }
}
