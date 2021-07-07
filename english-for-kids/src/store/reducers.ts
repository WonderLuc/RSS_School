import { combineReducers } from 'redux';
import {
  IDataState,
  DataManageTypes,
  DataAction,
  MenuAction,
  MenuManageTypes,
  IMenuState,
  IPlayModeState,
  PlayModeManageTypes,
  PlayModeAction,
  IGameState,
  GameAction,
  GameManageTypes,
  IGameStatistics,
  StatisticsAction,
  StatisticsTypes,
} from './redux-types';
import mockData from './mockData';

export const initialState: IDataState = {
  categories: [],
  loading: false,
};

export const mockMenu: IMenuState = { isOpenNav: false };
export const mockPlayMode: IPlayModeState = { isPlay: false };
const savedStat = localStorage.getItem('statistics');
export const mockStatictics: IGameStatistics = savedStat ? JSON.parse(savedStat) : {
  games: [],
};
export const mockGame: IGameState = {
  words: [],
  succesfulyWords: [],
  isFinished: true,
  categoryName: '',
  mistakes: 0,
};

export function dataManageReducer(state = mockData, action: DataAction): IDataState {
  switch (action.type) {
    case DataManageTypes.FETCH_DATA:
      return { ...state, loading: true };
    case DataManageTypes.FETCH_SUCCESS:
      return { ...state, loading: false };
    case DataManageTypes.FETCH_DATA_RECIVE:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

export function menuManageReducer(state = mockMenu, action: MenuAction): IMenuState {
  switch (action.type) {
    case MenuManageTypes.OPEN_MENU:
      return { ...state, isOpenNav: true };
    case MenuManageTypes.CLOSE_MENU:
      return { ...state, isOpenNav: false };
    default:
      return state;
  }
}

export function playModeManageReducer(state = mockPlayMode, action: PlayModeAction): IPlayModeState {
  switch (action.type) {
    case PlayModeManageTypes.PLAY_MODE_ON:
      return { ...state, isPlay: true };
    case PlayModeManageTypes.PLAY_MODE_OFF:
      return { ...state, isPlay: false };
    default:
      return state;
  }
}
export function gameManageReducer(state = mockGame, action: GameAction): IGameState {
  switch (action.type) {
    case GameManageTypes.UPDATE_GAME_STATE:
      return { ...state, ...action.payload };
    case GameManageTypes.CORRECT_WORD:
      return {
        ...state,
        succesfulyWords: state.succesfulyWords.concat([action.payload]),
        words: state.words.slice(1),
        isFinished: !(state.words.length - 1),
      };
    case GameManageTypes.WRONG_WORD:
      return {
        ...state,
        mistakes: state.mistakes + 1,
      };
    case GameManageTypes.CLEAR_GAME:
      return mockGame;
    default:
      return state;
  }
}

export function staticticsManageReducer(state = mockStatictics, action: StatisticsAction): IGameStatistics {
  switch (action.type) {
    case StatisticsTypes.SAVE_GAME_STAT:
      localStorage.setItem('statistics', JSON.stringify(state));
      return state;
    case StatisticsTypes.UPDATE_STATISTICS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export const reducer = combineReducers({
  dataManageReducer,
  menuManageReducer,
  playModeManageReducer,
  gameManageReducer,
  staticticsManageReducer,
});

export type RootReducer = ReturnType<typeof reducer>;
