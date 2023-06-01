// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

// ============= Your Code Here =============
/**
 * 由于在 TypeScript 类型系统中，无法直接比较数字 T U 的大小，所以我们可以相应地构造两个数组 A B 来进行比较：
 * 1、若 A 的长度不等于 T 且 B 的长度不等于 U，说明 A / B 的长度还不够，继续分别向两个数组中填充 1；
 * 2、若 A 的长度已经等于 T，由于 A / B 是同时增长的，所以说明 A <= B，故返回 false；
 * 3、若 B 的长度已经等于 U，同理说明 A > B，所以返回 true。
 */
// type GreaterThan<
//   T extends number,
//   U extends number,
//   A extends number[] = [],
//   B extends number[] = []
// > = T extends A['length']
//   ? false
//   : U extends B['length']
//   ? true
//   : GreaterThan<T, U, [...A, 1], [...B, 1]>;

/**
 * @todo 数组是过不了大数测试用例的，需要考虑转字符串比较
 */
type ParseInt<S extends string> = S extends `${infer N extends number}` ? N : 0;

type GreaterThanBySmallNumber<
  T extends number,
  U extends number,
  Arr extends any[] = []
> = T extends Arr['length']
  ? false
  : U extends Arr['length']
  ? true
  : GreaterThanBySmallNumber<T, U, [...Arr, any]>;

type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : [];

type UnShift<T extends string[]> = T extends [string, ...infer Rest]
  ? Rest
  : [];
type GreaterThanByArray<
  T extends string[],
  U extends string[]
> = T[0] extends U[0]
  ? T['length'] extends 1
    ? false
    : GreaterThanByArray<UnShift<T>, UnShift<U>>
  : GreaterThanBySmallNumber<ParseInt<T[0]>, ParseInt<U[0]>>;

type GreaterThan<
  T extends number,
  U extends number,
  TArr extends string[] = StringToArray<`${T}`>,
  UArr extends string[] = StringToArray<`${U}`>
> = TArr['length'] extends UArr['length']
  ? GreaterThanByArray<TArr, UArr>
  : GreaterThanBySmallNumber<TArr['length'], UArr['length']>;
