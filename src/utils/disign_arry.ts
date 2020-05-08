import { Sodo } from '../actions';
import shuffleArray from './random_generator';
const sodoArray = (m: number, n: number): Sodo => {
  let array1: number[] = [];
  let array2: number[] = [];
  for (let i = 0; i < m * n; i++) {
    array1.push(i + 1);
    array2.push(i);
  }
  array2 = shuffleArray(array2);
  const out = { id: array1, title: array2, move: 0, result: false };
  return out;
};

export default sodoArray;
