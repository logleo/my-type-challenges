// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]


// ============= Your Code Here =============
// 这个处理在 298 题（求字符串长度）中出现过，只不过最后处理是进行联合运算，而非生成数组（元组）。
type StringToUnion<T extends string> = T extends '' ? never : T extends `${infer L}${infer R}` ? L | StringToUnion<R> : never;
