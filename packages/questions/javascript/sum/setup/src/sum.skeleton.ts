type SumResult = (value: undefined | number) => number | SumResult;

export default function sum(value: number | undefined): SumResult {
  throw 'Not implemented!';
}
