// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
/**
 * 知识点：单独的 never 类型是无法直接判断（extends）的，需要用数组/元组包裹。
 */
// type IsNever1<T> = T extends never ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;
