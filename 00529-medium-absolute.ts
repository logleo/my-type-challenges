// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>
];

// ============= Your Code Here =============
/**
 * 用例范围：
 * - 普通数字：123
 * - 分组数字：1_2345（等价于 12345）
 * - 十六进制：0xF123
 * - 八进制：0o123
 * - 科学计数法：1e10
 * - bigint：123n（末尾有 n）
 * 
 * 知识点：
 * 在 TypeScript 中，通过模板字符串将数组转换为字符串时，上面这些情况编译器会自动进行转换。
 * 所以仅仅需要考虑将负数转换为正数即可。
 * 
 * Template String Example:
  // type NumToStr<
  //   T extends number | bigint
  // > = `${T}`
  // type A = NumToStr<123> // "123"
  // type B = NumToStr<1_2345> // "12345"
  // type C = NumToStr<0xF123> // "61731"
  // type D = NumToStr<0o123> // 83
  // type E = NumToStr<1e5> // "100000"
  // type F = NumToStr<123n> // 123
 */

type Absolute<T extends number | string | bigint> =
  `${T}` extends `${infer F}${infer R}` ? (F extends `-` ? R : `${F}${R}`) : '';
