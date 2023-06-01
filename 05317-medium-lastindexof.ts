// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
];

// ============= Your Code Here =============
type LastIndexOf<
  T extends unknown[],
  U extends number,
  CurIdxArr extends number[] = [],
  LastIdx = -1
> = T extends [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? LastIndexOf<Rest, U, [...CurIdxArr, 1], CurIdxArr['length']>
    : LastIndexOf<Rest, U, [...CurIdxArr, 1], LastIdx>
  : LastIdx;
