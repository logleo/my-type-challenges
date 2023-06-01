// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

// ============= Your Code Here =============
/**
 * 拍平一次的情况
 */
type FlattenOnce<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...F, ...FlattenOnce<R>]
    : [F, ...FlattenOnce<R>]
  : [];

/**
 * 增加一个变量来控制递归次数
 */
type FlattenDepth<
  T extends unknown[],
  K extends number = 1,
  Current extends number[] = []
> = Current['length'] extends K
  ? T
  : T extends [infer F, ...infer Rest]
  ? F extends any[]
    ? [
        ...FlattenDepth<F, K, [...Current, 0]>,
        ...FlattenDepth<Rest, K, Current>
      ]
    : [F, ...FlattenDepth<Rest, K, Current>]
  : [];
