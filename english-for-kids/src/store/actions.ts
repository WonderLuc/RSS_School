import {
  ClearGameAction,
  CloseMenuAction,
  CorrectWordAction,
  DataManageTypes,
  FetchDataAction,
  FetchDataReciveAction,
  FetchSuccessAction,
  GameManageTypes,
  ICategory,
  IGameState,
  IGameStatistics,
  IWordStatistics,
  MenuManageTypes,
  OpenMenuAction,
  PlayModeManageTypes,
  PlayModeOffAction,
  PlayModeOnAction,
  SaveStatAction,
  StatisticsTypes,
  UpdateGameAction,
  UpdateStatisticsAction,
  WrongWordAction,
} from './redux-types';

// Data Actions
export function getData(): FetchDataAction {
  return {
    type: DataManageTypes.FETCH_DATA,
  };
}

export function writeDataToState(categories: ICategory[]): FetchDataReciveAction {
  return {
    type: DataManageTypes.FETCH_DATA_RECIVE,
    payload: categories,
  };
}

export function dataEnd(): FetchSuccessAction {
  return {
    type: DataManageTypes.FETCH_SUCCESS,
  };
}

// Menu Actions
export function openMenu(): OpenMenuAction {
  return {
    type: MenuManageTypes.OPEN_MENU,
  };
}

export function closeMenu(): CloseMenuAction {
  return {
    type: MenuManageTypes.CLOSE_MENU,
  };
}

// Play Mode Actions
export function playModeOn(): PlayModeOnAction {
  return {
    type: PlayModeManageTypes.PLAY_MODE_ON,
  };
}

export function playModeOff(): PlayModeOffAction {
  return {
    type: PlayModeManageTypes.PLAY_MODE_OFF,
  };
}

// Game Actions
export function updateGame(payload: IGameState): UpdateGameAction {
  return {
    type: GameManageTypes.UPDATE_GAME_STATE,
    payload,
  };
}

export function sendCorrectWord(payload: IWordStatistics): CorrectWordAction {
  return {
    type: GameManageTypes.CORRECT_WORD,
    payload,
  };
}

export function sendWrongWord(payload: IWordStatistics): WrongWordAction {
  return {
    type: GameManageTypes.WRONG_WORD,
    payload,
  };
}

export function clearGame(): ClearGameAction {
  return {
    type: GameManageTypes.CLEAR_GAME,
  };
}

// Statistics
export function saveStatistics(): SaveStatAction {
  return {
    type: StatisticsTypes.SAVE_GAME_STAT,
  };
}

export function updateStatistics(payload: IGameStatistics): UpdateStatisticsAction {
  return {
    type: StatisticsTypes.UPDATE_STATISTICS,
    payload,
  };
}
