// State types
export interface IWord {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface IWordStatistics extends IWord{
  tries: number;
  succesfull: number;
  trained: number;
}

export interface ICategory {
  name: string;
  words: IWord[];
}

export interface ICategoryStatistics{
  name: string;
  words: IWordStatistics[];
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

export interface IGameState {
  isFinished: boolean;
  words: IWordStatistics[];
  succesfulyWords: IWordStatistics[];
  categoryName: string;
  mistakes: number;
}

export interface IGameStatistics {
  categories: ICategoryStatistics[];
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

// Game
export enum GameManageTypes {
  UPDATE_GAME_STATE = 'UPDATE_GAME_STATE',
  CORRECT_WORD = 'CORRECT_WORD',
  WRONG_WORD = 'WRONG_WORD',
  CLEAR_GAME = 'CLEAR_GAME',
}

export interface UpdateGameAction {
  type: GameManageTypes.UPDATE_GAME_STATE;
  payload: IGameState;
}

export interface CorrectWordAction {
  type: GameManageTypes.CORRECT_WORD;
  payload: IWordStatistics;
}

export interface WrongWordAction {
  type: GameManageTypes.WRONG_WORD;
  payload: IWordStatistics;
}

export interface ClearGameAction {
  type: GameManageTypes.CLEAR_GAME;
}

export type GameAction = UpdateGameAction | WrongWordAction | CorrectWordAction | ClearGameAction;

// Statistics
export enum StatisticsTypes {
  SAVE_GAME_STAT = 'UPDATE_GAME_STATE',
  UPDATE_STATISTICS = 'UPDATE_STATISTICS',
}

export interface SaveStatAction {
  type: StatisticsTypes.SAVE_GAME_STAT;
}

export interface UpdateStatisticsAction {
  type: StatisticsTypes.UPDATE_STATISTICS;
  payload: IGameStatistics;
}

export type StatisticsAction = SaveStatAction | UpdateStatisticsAction;
