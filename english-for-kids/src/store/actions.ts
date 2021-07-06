import {
  DataManageTypes, FetchDataAction, FetchDataReciveAction, FetchSuccessAction, ICategory,
} from './redux-types';

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
