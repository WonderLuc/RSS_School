class State {
  garagePage: number;

  winnersPage: number;

  updateCarData: CarInterface | undefined;

  newCarData: CarInterface;

  constructor() {
    this.garagePage = 0;
    this.winnersPage = 0;
    this.updateCarData = undefined;
    this.newCarData = { name: '', color: '', id: 0 };
  }
}

export const state = new State();

export interface CarInterface {
  name: string;
  color: string;
  id: number;
}
