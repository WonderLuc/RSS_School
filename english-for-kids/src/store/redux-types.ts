// State types
export interface IWord {
  word: string;
  translation: string;
  image: string;
}

export interface ICategory {
  name: string;
  words: IWord[];
}

export interface IState {
  categories: ICategory[];
  loading: boolean;
}

// Action types
export enum DataManageTypes {
  FETCH_DATA = 'FETCH_DATA',
  FETCH_DATA_RECIVE = 'FETCH_DATA_RECIVE',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
}

export interface FetchDataAction {
  type: DataManageTypes.FETCH_DATA;
}

export interface FetchSuccessAction {
  type: DataManageTypes.FETCH_SUCCESS;
}

export interface FetchDataReciveAction {
  type: DataManageTypes.FETCH_DATA_RECIVE;
  payload: ICategory[];
}

export type Action = FetchDataAction | FetchSuccessAction | FetchDataReciveAction;
