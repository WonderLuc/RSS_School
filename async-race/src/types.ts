export interface ICar {
  container: HTMLElement;
  carData: CarInterface;
  velocityPercent: number;
  rideTime: number | undefined;
  isBroken: boolean;
  isFinsed: boolean;
}

export interface CarInterface {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  container: HTMLElement;
  id: number;
  wins: number;
  time: number;
  name: string;
  color: string;
  index: number;
  render(): HTMLElement;
}

export interface ICarSettings {
  container: HTMLElement;
  name: string;
  carData: CarInterface | undefined;
}

export interface IGarage {
  container: HTMLElement;
  carSettings: ICarSettings;
  carsArray: ICar[];
  currentCars: ICar[];
  isUpdateble: boolean;
  loader: HTMLElement;
  currentWinner: ICar | undefined;
}

export interface IEngineData {
  velocity: number;
  distance: number;
}

export interface IWinners {
  container: HTMLElement;
  isUpdateble: boolean;
  winners: IWinner[];
  currentWinners: IWinner[];
}

export interface IWinnersData {
  wins: number;
  id: number;
  time: number;
}
