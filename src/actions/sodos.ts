import { ActionTypes } from './types';
import shuffleArray from '../utils/random_generator';

export interface Sodo {
  id: number[];
  title: number[];
  move: number;
  result: boolean;
}

export interface NewGameAction {
  type: ActionTypes.NEW_GAME;
  payload: Sodo;
}

export interface SelectedItem {
  type: ActionTypes.SELECTED_ITEM;
  payload: Sodo;
}
export interface MoveItem {
  type: ActionTypes.MOVE_ITEM;
  payload: Sodo;
}

export const newgame = (SoDo: Sodo): NewGameAction => {
  const title = shuffleArray(SoDo.title);

  const out: Sodo = { id: SoDo.id, title: title, move: 0, result: false };
  return {
    type: ActionTypes.NEW_GAME,
    payload: out,
  };
};
export const keyboardmove = (SoDo: Sodo, keypressedid: number): MoveItem => {
  const isZeroTitle = (element: number) => element === 0;

  const ind: number = SoDo.title.findIndex(isZeroTitle);

  let displacevalue: number;
  switch (keypressedid) {
    case 37:
      if (ind % 4 === 0) {
        displacevalue = 0;
      } else {
        displacevalue = -1;
      }
      break;
    case 38:
      displacevalue = -4;
      break;
    case 39:
      if (ind % 4 === 3) {
        displacevalue = 0;
      } else {
        displacevalue = 1;
      }
      break;
    case 40:
      displacevalue = 4;
      break;
    default:
      displacevalue = 0;
  }

  if (ind + displacevalue >= 0 && ind + displacevalue <= 15) {
    SoDo.title[ind] = SoDo.title[ind + displacevalue];
    SoDo.title[ind + displacevalue] = 0;
    if (displacevalue !== 0) {
      SoDo.move++;
    }
  }
  let winArray: number[] = [];
  for (let i = 0; i < SoDo.title.length; i++) {
    winArray.push(i);
  }
  for (var i = 0; i < SoDo.title.length; i++) {
    if (SoDo.title[i] !== winArray[i]) {
      SoDo.result = false;
      break;
    } else {
      SoDo.result = true;
    }
  }

  return {
    type: ActionTypes.MOVE_ITEM,
    payload: SoDo,
  };
};

export const selecteditem = (id: number, SoDo: Sodo): SelectedItem => {
  function difference(a: number, b: number): number {
    return Math.abs(a - b);
  }

  const isZeroTitle = (element: number) => element === 0;
  const ind: number = SoDo.title.findIndex(isZeroTitle);

  if (difference(ind, id) === 1 || difference(ind, id) === 4) {
    SoDo.title[ind] = SoDo.title[id];
    SoDo.title[id] = 0;
    SoDo.move++;
    let winArray: number[] = [];

    for (let i = 0; i < SoDo.title.length; i++) {
      winArray.push(i);
    }

    if (SoDo.title === winArray) {
      SoDo.result = true;
    }

    return {
      type: ActionTypes.SELECTED_ITEM,
      payload: SoDo,
    };
  }

  return {
    type: ActionTypes.SELECTED_ITEM,
    payload: SoDo,
  };
};
