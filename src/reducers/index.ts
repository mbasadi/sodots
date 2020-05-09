import { combineReducers } from 'redux';
import { todosReducer } from './sodos';
import { Sodo } from '../actions';

export interface StoreState {
  Sodos: Sodo;
}

export const reducers = combineReducers<StoreState>({
  Sodos: todosReducer,
});
