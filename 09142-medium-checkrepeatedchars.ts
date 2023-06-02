// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>
];

// ============= Your Code Here =============
/** 利用模板字符串特性 */
type CheckRepeatedChars<T extends string> =
  T extends `${infer F}${infer Y extends string}`
    ? Y extends `${infer A}${F}${infer B}`
      ? true
      : CheckRepeatedChars<Y>
    : false;
