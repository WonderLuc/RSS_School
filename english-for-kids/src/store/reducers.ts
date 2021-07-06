import { IState, DataManageTypes, Action } from './redux-types';

export const initialState: IState = {
  categories: [],
  loading: false,
};

export function dataManageReducer(state = initialState, action: Action): IState {
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

export type RootReducer = ReturnType<typeof dataManageReducer>;
