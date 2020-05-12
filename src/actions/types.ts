import { NewGameAction, SelectedItem, MoveItem } from './sodos';

export enum ActionTypes {
  NEW_GAME,
  SELECTED_ITEM,
  MOVE_ITEM,
}

export type Action = NewGameAction | SelectedItem | MoveItem;
