// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];

// ============= Your Code Here =============
// 转数组，再取长度(简化版本)
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];

// 分步骤处理
// type StrToArr<S extends string> = S extends `${infer F}${infer R}`
//   ? [F, ...StrToArr<R>]
//   : [];
// type LengthOfString<S extends string> = StrToArr<S>['length'];
