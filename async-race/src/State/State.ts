class State {
  garagePage: number;

  winnersPage: number;

  updateCarData: CarInterface | undefined;

  constructor() {
    this.garagePage = 0;
    this.winnersPage = 0;
    this.updateCarData = undefined;
  }
}

export const state = new State();

export interface CarInterface {
  name: string;
  color: string;
  id: number;
}
