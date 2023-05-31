// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>
];

// ============= Your Code Here =============
// 模板字符串语法 + infer 推断 + 递归
type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer E}`
  ? TrimLeft<E>
  : S;
