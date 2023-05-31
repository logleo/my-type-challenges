// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];

// ============= Your Code Here =============
type Blank = ' ' | '\t' | '\n';

// 左边判断到底之后，接着判断右边
type Trim<S extends string> = S extends `${Blank}${infer A}`
  ? Trim<A>
  : S extends `${infer B}${Blank}`
  ? Trim<B>
  : S;
