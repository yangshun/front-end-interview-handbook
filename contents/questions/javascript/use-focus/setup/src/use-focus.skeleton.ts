import { RefObject } from 'react';

export default function useFocus<T extends HTMLElement>(): [
  RefObject<T>,
  () => void,
] {
  throw 'Not implemented';
}
