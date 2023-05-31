// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


// ============= Your Code Here =============
// 第一项可能是 undefinded（[]），可以考虑用 infer 推断 元组第一项
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
