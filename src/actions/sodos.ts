import { ActionTypes } from './types';
import shuffleArray from '../utils/random_generator';

export interface Sodo {
  id: number[];
  title: number[];
  move: number;
  result: boolean;
}

export interface NewGameAction {
  type: ActionTypes.newgame;
  payload: Sodo;
}

export interface SelectedItem {
  type: ActionTypes.selecteditem;
  payload: Sodo;
}

export const newgame = (sodo: Sodo): NewGameAction => {
  const title = shuffleArray(sodo.title);

  const out: Sodo = { id: sodo.id, title: title, move: 0, result: false };
  return {
    type: ActionTypes.newgame,
    payload: out,
  };
};

export const selecteditem = (id: number, sodo: Sodo): SelectedItem => {
  function difference(a: number, b: number): number {
    return Math.abs(a - b);
  }

  const isLargeNumber = (element: number) => element === 0;
  const ind: number = sodo.title.findIndex(isLargeNumber);

  if (difference(ind, id) === 1 || difference(ind, id) === 4) {
    sodo.title[ind] = sodo.title[id];
    sodo.title[id] = 0;
    sodo.move++;
    let winArray: number[] = [];

    for (let i = 0; i < sodo.title.length; i++) {
      winArray.push(i);
    }

    if (sodo.title === winArray) {
      sodo.result = true;
    }

    return {
      type: ActionTypes.selecteditem,
      payload: sodo,
    };
  }

  return {
    type: ActionTypes.selecteditem,
    payload: sodo,
  };
};
