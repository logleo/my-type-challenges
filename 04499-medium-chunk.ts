// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
/**
 * @todo 清空 Cache 继续迭代的过程有点没看懂
 */
type Chunk<
  T extends unknown[],
  U extends number,
  Cache extends unknown[] = []
> = T['length'] extends 0
  ? Cache['length'] extends 0
    ? []
    : [Cache]
  : Cache['length'] extends U
  ? [Cache, ...Chunk<T, U>]
  : T extends [infer F, ...infer R]
  ? Chunk<R, U, [...Cache, F]>
  : [];
