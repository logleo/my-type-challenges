// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]


// ============= Your Code Here =============
// 第三个用例推断不出的时候，要返回空数组（元组）
type Pop<T extends any[]> = T extends [...infer Prev, unknown] ? Prev : [];
