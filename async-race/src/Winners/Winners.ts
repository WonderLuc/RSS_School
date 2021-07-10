import { Api } from '../Api/Api';
import { leafThroughtPage } from '../commonFunc';
import { state } from '../State/State';
import { IWinnersData } from '../types';
import Winner from '../Winner/Winner';

require('./style.scss');

function quickSortWins(arr: Winner[]): Winner[] {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const less = arr.filter((winner) => {
    return winner.wins < pivot.wins;
  });
  const greater = arr.filter((winner) => {
    return winner.wins > pivot.wins;
  });
  const equal = arr.filter((winner) => {
    return winner.wins === pivot.wins;
  });
  return [...quickSortWins(less), ...equal, pivot, ...quickSortWins(greater)];
}

function quickSortTime(arr: Winner[]): Winner[] {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const less = arr.filter((winner) => {
    return winner.time < pivot.time;
  });
  const greater = arr.filter((winner) => {
    return winner.time > pivot.time;
  });
  const equal = arr.filter((winner) => {
    return winner.time === pivot.time;
  });
  return [...quickSortTime(less), ...equal, pivot, ...quickSortTime(greater)];
}

export default class Winners {
  container: HTMLElement;

  isUpdateble: boolean;

  winners: Winner[];

  currentWinners: Winner[];

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
    this.currentWinners.forEach((winnner: Winner, index) => {
      winnner.setIndex(state.winnersPage * 10 + index);
      this.container.querySelector('.winners')?.append(winnner.render());
    });
  }

  async update(): Promise<void> {
    await this.configureWiiners();
  }

  sortByWins(): Winner[] {
    return quickSortWins(this.winners);
  }

  sortByTime(): Winner[] {
    return quickSortTime(this.winners);
  }

  sort(): void {
    if (state.sortedByWins) {
      this.winners = state.isAscending
        ? this.sortByWins()
        : this.sortByWins().reverse();
    } else {
      this.winners = state.isAscending
        ? this.sortByTime()
        : this.sortByTime().reverse();
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
