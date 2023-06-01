// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
/** 第二个参数可能是数组，需要转 Union 才能判断包含关系 */
type ValueOf<T> = T extends [...any] ? T[number] : T;

type Without<T, U> = T extends [infer F, ...infer R]
  ? F extends ValueOf<U>
    ? Without<R, U>
    : [F, ...Without<R, U>]
  : [];
