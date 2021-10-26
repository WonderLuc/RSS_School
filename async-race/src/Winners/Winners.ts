import { Api } from '../Api/Api';
import { leafThroughtPage } from '../commonFunc';
import { state } from '../State/State';
import { IWinner, IWinnersData, IWinnerSortedArray } from '../types';
import Winner from '../Winner/Winner';

require('./style.scss');

function transfromToSortArray(arr: IWinner[]): IWinnerSortedArray[] {
  return arr.map((winner) => {
    return {
      component: winner,
      wins: winner.wins,
      time: winner.time,
    };
  });
}

function transformToWinnerArray(arr: IWinnerSortedArray[]): IWinner[] {
  return arr.map((winner) => {
    return winner.component;
  });
}

function quickSort(
  arr: IWinnerSortedArray[],
  sortProp: 'wins' | 'time'
): IWinnerSortedArray[] {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const less = arr.filter((winner) => {
    return winner[sortProp] < pivot[sortProp];
  });
  const greater = arr.filter((winner) => {
    return winner[sortProp] > pivot[sortProp];
  });
  const equal = arr.filter((winner) => {
    return winner[sortProp] === pivot[sortProp];
  });
  return [
    ...quickSort(less, sortProp),
    ...equal,
    pivot,
    ...quickSort(greater, sortProp),
  ];
}

export default class Winners {
  container: HTMLElement;

  isUpdateble: boolean;

  winners: IWinner[];

  currentWinners: IWinner[];

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('winners-page');
    this.isUpdateble = true;
    this.winners = [];
    this.currentWinners = [];
  }

  render(): HTMLElement {
    this.container.innerHTML = `
    <h2>Winners (<span class="car-count">${this.winners.length}</span>)</h2>
    <h3>Page <span class="car-count">${state.winnersPage + 1}</span></h3>
    <table class="winners">
      <thead>
        <td>Number</td>
        <td>Car</td>
        <td>Name</td>
        <td class="wins"><span class="wins-selector
        ${state.isAscending ? 'selector-asc' : 'selector-desc'}
        ${state.sortedByWins ? 'selector_active' : ''}
        ">Wins</span></td>
        <td class="time"><span class="time-selector 
        ${state.isAscending ? 'selector-asc' : 'selector-desc'}
        ${state.sortedByWins ? '' : 'selector_active'}
        ">Best Time</span></td>
      </thead>
    </table>
    <div class="pagination">
      <button class="pagination__btn pagination__btn_prev" 
      ${state.winnersPage <= 0 ? 'disabled' : ''}
      > Previous</button>
      <button class="pagination__btn pagination__btn_next"
      ${state.winnersPage >= this.winners.length / 10 - 1 ? 'disabled' : ''}
      > Next</button>
    </div>
    `;
    this.renderWinners();
    this.addListeners();
    return this.container;
  }

  renderWinners(): void {
    this.currentWinners.forEach((winnner: IWinner, index) => {
      winnner.setIndex(state.winnersPage * 10 + index);
      this.container.querySelector('.winners')?.append(winnner.render());
    });
  }

  async update(): Promise<void> {
    await this.configureWiiners();
  }

  sortByTypes(sortType: 'wins' | 'time'): IWinner[] {
    let arr = transfromToSortArray(this.winners);
    arr = quickSort(arr, sortType);
    return transformToWinnerArray(arr);
  }

  sort(): void {
    if (state.sortedByWins) {
      this.winners = state.isAscending
        ? this.sortByTypes('wins')
        : this.sortByTypes('wins').reverse();
    } else {
      this.winners = state.isAscending
        ? this.sortByTypes('time')
        : this.sortByTypes('time').reverse();
    }
  }

  async configureWiiners(): Promise<void> {
    const winnersData = await Api.getWinners();
    if (winnersData) {
      this.winners = winnersData.map(
        (winner: IWinnersData) => new Winner(winner)
      );
      this.sort();
      this.currentWinners = this.winners.slice(
        state.winnersPage * 10,
        state.winnersPage * 10 + 10
      );
      this.winners.forEach((winner) => winner.getWinnerData());
    }
  }

  leafThroughtPageHandler(e: Event, isForward: boolean): void {
    e.preventDefault();
    leafThroughtPage('winnersPage', isForward);
    this.currentWinners = this.winners.slice(
      state.winnersPage * 10,
      state.winnersPage * 10 + 10
    );
    this.render();
  }

  async sortByWinsHandler(e: Event): Promise<void> {
    e.preventDefault();
    if (state.sortedByWins) {
      state.isAscending = !state.isAscending;
    }
    state.sortedByWins = true;
    await this.update();
    await this.render();
  }

  async sortByTimeHandler(e: Event): Promise<void> {
    e.preventDefault();
    if (!state.sortedByWins) {
      state.isAscending = !state.isAscending;
    }
    state.sortedByWins = false;
    await this.update();
    await this.render();
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

    this.container
      .querySelector('.wins')
      ?.addEventListener('click', this.sortByWinsHandler.bind(this));

    this.container
      .querySelector('.time')
      ?.addEventListener('click', this.sortByTimeHandler.bind(this));
  }
}
