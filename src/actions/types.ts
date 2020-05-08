import { NewGameAction, SelectedItem } from './sodos';

export enum ActionTypes {
  newgame,
  selecteditem,
}

export type Action = NewGameAction | SelectedItem;
