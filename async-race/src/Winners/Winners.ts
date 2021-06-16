import { state, IWinner } from '../State/State';
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
        <td>Wins</td>
        <td>Best Time</td>
      </thead>
    </table>
    <div class="pagination">
      <button class="pagination__btn pagination__btn_prev" 
      ${state.winnersPage <= 0 ? 'disabled' : ''}
      > Previous</button>
      <button class="pagination__btn pagination__btn_next"
      ${state.winnersPage >= this.winners.length / 7 - 1 ? 'disabled' : ''}
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

  async getWinners(): Promise<void> {
    const req = await fetch('http://127.0.0.1:3000/winners');
    if (req.ok) {
      const res = await req.json();
      this.winners = res.map((winner: IWinner) => new Winner(winner));
      this.sort();
      this.currentWinners = this.winners.slice(
        state.winnersPage * 10,
        state.winnersPage * 10 + 10
      );
      this.winners.forEach((winner) => winner.getCar());
    }
  }

  async update(): Promise<void> {
    await this.getWinners();
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

  toNextPage(): void {
    state.winnersPage += 1;
    this.currentWinners = this.winners.slice(
      state.winnersPage * 10,
      state.winnersPage * 10 + 10
    );
  }

  toPrevPage(): void {
    state.winnersPage -= 1;
    this.currentWinners = this.winners.slice(
      state.winnersPage * 10,
      state.winnersPage * 10 + 10
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
