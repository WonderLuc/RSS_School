import { createStore } from 'redux';
import { initialState, dataManageReducer } from './reducers';

const store = createStore(dataManageReducer, initialState);

export default store;
