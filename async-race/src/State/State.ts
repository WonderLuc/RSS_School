import { CarInterface } from '../types';

class State {
  garagePage: number;

  winnersPage: number;

  updateCarData: CarInterface | undefined;

  newCarData: CarInterface;

  sortedByWins: boolean;

  isAscending: boolean;

  constructor() {
    this.garagePage = 0;
    this.winnersPage = 0;
    this.updateCarData = undefined;
    this.newCarData = { name: '', color: '#FFFFFF', id: 0 };
    this.sortedByWins = true;
    this.isAscending = true;
  }
}

export const state = new State();
