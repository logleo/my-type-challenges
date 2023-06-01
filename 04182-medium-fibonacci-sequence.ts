// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type NumberToTuple<
  T extends number,
  U extends number[] = []
> = T extends U['length'] ? U : NumberToTuple<T, [1, ...U]>;

// 计算斐波那契数
type CalculateNextFibonacci<T extends number[]> = T extends [
  ...any,
  infer F extends number,
  infer S extends number
]
// 这里编译器会提示 “类型实例化过深，且可能无限。”
  ? [...NumberToTuple<F>, ...NumberToTuple<S>]['length']
  : T['length'];

type Fibonacci<
  T extends number,
  U extends number[] = [1]
> = U['length'] extends T
  ? U extends [...any, infer L]
    ? L
    : never
  : Fibonacci<T, [...U, CalculateNextFibonacci<U>]>;
