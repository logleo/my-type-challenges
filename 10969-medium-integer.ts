// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

let x = 1;
let y = 1 as const;

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>
];

// ============= Your Code Here =============
/**
 * 1、通过 ${T} 的方式，将数字 T 转化为字符串；
 * 2、通过 ${string}.${string} 判断是否有小数部分；
 * 3、如果有小数部分，则说明不是整数，返回 never；
 * 4、如果没有小数部分，还有可能是因为 T 为 number 而不是具体的数字，再通过 number extends T 判断即可。
 */
type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : number extends T
  ? never
  : T;
