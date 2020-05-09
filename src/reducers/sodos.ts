import { Sodo, Action, ActionTypes } from '../actions';
import sodoArray from '../utils/disign_arry';

const ini = sodoArray(4, 4);

export const todosReducer = (state: Sodo = ini, action: Action) => {
  switch (action.type) {
    case ActionTypes.newgame:
      return action.payload;
    case ActionTypes.selecteditem:
      return action.payload;
    default:
      return state;
  }
};
