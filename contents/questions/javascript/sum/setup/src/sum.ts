type SumResult = (value?: number) => number | SumResult;

export default function sum(numberA: number): SumResult {
  return function (numberB) {
    return numberB === undefined ? numberA : sum(numberA + numberB);
  };
}
