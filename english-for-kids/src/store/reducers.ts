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
  IWordStatistics,
  ICategoryStatistics,
  UpdateStatisticsAction,
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
  categories: mockData.categories.map((cat) => ({
    words: cat.words.map((word) => {
      word.tries = 0;
      word.trained = 0;
      word.succesfull = 0;
      word.categoryName = cat.name;
      return word;
    }),
    name: cat.name,
  })),
};
export const mockGame: IGameState = {
  words: [],
  succesfulyWords: [],
  isFinished: true,
  categoryName: '',
  mistakes: 0,
  misScore: 0,
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
        misScore: state.misScore + 1,
      };
    case GameManageTypes.CLEAR_GAME:
      return mockGame;
    case GameManageTypes.CLEAR_MISTAKES:
      return {
        ...state,
        mistakes: 0,
      };
    default:
      return state;
  }
}

function findWordInCategoryState(cat: ICategoryStatistics, find: string): IWordStatistics | undefined {
  return cat.words.filter((word) => word.word === find)[0];
}

function buildCategories(categories: ICategoryStatistics[], action: UpdateStatisticsAction): ICategoryStatistics[] {
  const newData = action.payload.categories[0];
  const tryFindCategory: ICategoryStatistics | undefined = categories
    .filter((category) => category.name === newData.name)[0];
  if (!tryFindCategory) {
    return categories.concat(newData);
  }
  return categories.map((cat) => {
    if (cat.name === newData.name) {
      const newWordsArr: IWordStatistics[] = [];
      newData.words.forEach((word) => {
        const findedWord: IWordStatistics | undefined = findWordInCategoryState(cat, word.word);
        if (!findedWord) {
          newWordsArr.push(word);
          return;
        }
        findedWord.trained += word.trained;
        findedWord.tries += word.tries;
        findedWord.succesfull += word.succesfull;
      });

      cat.words = cat.words.concat(newWordsArr);
    }
    return cat;
  });
}

export function staticticsManageReducer(state = mockStatictics, action: StatisticsAction): IGameStatistics {
  switch (action.type) {
    case StatisticsTypes.SAVE_GAME_STAT:
      localStorage.setItem('statistics', JSON.stringify(state));
      return state;
    case StatisticsTypes.UPDATE_STATISTICS:
      return {
        ...state,
        categories: buildCategories(state.categories, action),
      };
    case StatisticsTypes.RESET_STATISTICS:
      return {
        categories: mockData.categories.map((cat) => ({
          words: cat.words.map((word) => ({
            ...word, tries: 0, trained: 0, succesfull: 0, categoryName: cat.name,
          })),
          name: cat.name,
        })),
      };
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
