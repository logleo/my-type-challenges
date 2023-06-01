// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >
];

// ============= Your Code Here =============
type IsInclude<T extends unknown[], K> = T extends [infer F, ...infer U]
  ? Equal<K, F> extends true
    ? true
    : IsInclude<U, K>
  : false;

type Unique<T extends unknown[], Result extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? IsInclude<Result, F> extends true
    ? Unique<R, Result>
    : Unique<R, [...Result, F]>
  : Result;
