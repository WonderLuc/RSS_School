import {
  CloseMenuAction,
  DataManageTypes,
  FetchDataAction,
  FetchDataReciveAction,
  FetchSuccessAction,
  ICategory,
  MenuManageTypes,
  OpenMenuAction,
  PlayModeManageTypes,
  PlayModeOffAction,
  PlayModeOnAction,
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
