import { combineReducers } from 'redux';
import { todosReducer } from './sodos';
import { Sodo } from '../actions';

export interface StoreState {
  SoDos: Sodo;
}

export const reducers = combineReducers<StoreState>({
  SoDos: todosReducer,
});
