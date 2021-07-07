import { combineReducers } from 'redux';
import {
  IDataState, DataManageTypes, DataAction, MenuAction, MenuManageTypes, IMenuState, IPlayModeState, PlayModeManageTypes, PlayModeAction,
} from './redux-types';

export const initialState: IDataState = {
  categories: [],
  loading: false,
};

export const mockMenu: IMenuState = { isOpenNav: false };
export const mockPlayMode: IPlayModeState = { isPlay: false };
export const mockData: IDataState = {
  loading: false,
  categories: [
    {
      name: 'action',
      words: [
        {
          word: 'Spell',
          translation: 'Произнести по буквам',
          image: '/assets/1.png',
        },
        {
          word: 'Do',
          translation: 'Делать',
          image: '',
        },
      ],
    },
    {
      name: 'animals',
      words: [
        {
          word: 'Mouse',
          translation: 'Мышь',
          image: '',
        },
        {
          word: 'Cat',
          translation: 'Кошка',
          image: '',
        },
      ],
    },
  ],
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

export const reducer = combineReducers({
  dataManageReducer,
  menuManageReducer,
  playModeManageReducer,
});

export type RootReducer = ReturnType<typeof reducer>;
