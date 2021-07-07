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

export interface IDataState {
  categories: ICategory[];
  loading: boolean;
}

export interface IMenuState {
  isOpenNav: boolean;
}

export interface IPlayModeState {
  isPlay: boolean;
}

// Action types
// Data
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

export type DataAction = FetchDataAction | FetchSuccessAction | FetchDataReciveAction;

// Menu
export enum MenuManageTypes {
  OPEN_MENU = 'OPEN_MENU',
  CLOSE_MENU = 'CLOSE_MENU',
}

export interface OpenMenuAction {
  type: MenuManageTypes.OPEN_MENU;
}

export interface CloseMenuAction {
  type: MenuManageTypes.CLOSE_MENU;
}

export type MenuAction = OpenMenuAction | CloseMenuAction;

// Play Mode
export enum PlayModeManageTypes {
  PLAY_MODE_ON = 'PLAY_MODE_ON',
  PLAY_MODE_OFF = 'PLAY_MODE_OFF',
}

export interface PlayModeOnAction {
  type: PlayModeManageTypes.PLAY_MODE_ON;
}

export interface PlayModeOffAction {
  type: PlayModeManageTypes.PLAY_MODE_OFF;
}

export type PlayModeAction = PlayModeOffAction | PlayModeOnAction;
