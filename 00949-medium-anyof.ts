// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
/**
 * T[number] 得到联合类型，作为范型进行 extends 运算，最后再联合（|）。
 */
type Falsy =
  | null
  | undefined
  | 0
  | ''
  | false
  | []
  | Record<PropertyKey, never>;
type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true;
