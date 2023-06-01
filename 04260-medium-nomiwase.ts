// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'AB'
      | 'AC'
      | 'BA'
      | 'BC'
      | 'CA'
      | 'CB'
      | 'ABC'
      | 'ACB'
      | 'BAC'
      | 'BCA'
      | 'CAB'
      | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >
];

// ============= Your Code Here =============
// 先转联合类型
type ToUnion<S extends string> = S extends `${infer F}${infer R}`
  ? F | ToUnion<R>
  : S;

// 两个的组合可能情况
type Combine<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

// 增加一个额外变量来表示/存储已参与排列的字符
type _AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combine<A, _AllCombinations<Exclude<B, A>>>
  : never;

// 入口
type AllCombinations<S extends string> = _AllCombinations<ToUnion<S>>;
