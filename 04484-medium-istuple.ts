// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>
];

// ============= Your Code Here =============
/**
 * 知识点：
 * 如何区分数组（array）和元组（tuple），关键在于：数组的长度为 number，元组的长度为固定的数字。
 */
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
  ? number extends T['length']
    ? false
    : true
  : false;
