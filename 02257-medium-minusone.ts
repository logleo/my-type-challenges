// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============
// 方法比较多，用例执行情况也不一样。
/**
 * 1、极简，实例化一个数组，不断增加内容匹配直到长度一致（但实例化过深）
 */ 
// type MinusOne<T extends number, arr extends any[] = []> = [
//   ...arr,
//   ''
// ]['length'] extends T
//   ? arr['length']
//   : MinusOne<T, [...arr, '']>;

/**
 * 2、转数组再去掉其中一项（同样生成了很大的元组）
 * 在 TypeScript 中，我们没有办法对数字类型直接进行加减等计算操作，所以能够想到的办法还是借助于数组。
 */
// type Dict = {
//   '0': [];
//   '1': [0];
//   '2': [0, 0];
//   '3': [0, 0, 0];
//   '4': [0, 0, 0, 0];
//   '5': [0, 0, 0, 0, 0];
//   '6': [0, 0, 0, 0, 0, 0];
//   '7': [0, 0, 0, 0, 0, 0, 0];
//   '8': [0, 0, 0, 0, 0, 0, 0, 0];
//   '9': [0, 0, 0, 0, 0, 0, 0, 0, 0];
// };

// 乘以 10 倍
// type TenTimes<A extends 0[]> = [
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A,
//   ...A
// ];

// 将数字转化为用 0 填充的数组，数字值对应数组长度
// 例如：
// 3 -> [0, 0, 0]
// 11 -> [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// type ToArray<
//   N extends string,
//   Result extends 0[] = []
// > = N extends `${infer F extends keyof Dict}${infer R}`
//   ? ToArray<R, [...TenTimes<Result>, ...Dict[F]]>
//   : Result;

// type MinusOne<T extends number> = ToArray<`${T}`> extends [infer F, ...infer R] ? R['length'] : never;

/**
 * 3、寻找最后一位，并找到它的上一位数
 * @see https://github.com/type-challenges/type-challenges/issues/27486
 */
type SingleDig = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

type ToNumber<T> = T extends `${infer N extends number}` ? N : never

type FlipText<S extends string, A extends string = ''> = S extends `${infer L}${infer R}` ? FlipText<R, `${L}${A}`> : A

type PreNum<T extends string, N = SingleDig, P = ''> = N extends [infer L, ...infer R] ? T extends L ? P : PreNum<T, R, L> : never

type MinusOneFn<S extends string, Minus = true, A extends string = ''> = S extends `${infer L}${infer R}` ? Minus extends true ? MinusOneFn<R, L extends '0' ? true : false, `${L extends '0' ? '9' : L extends '1' ? R extends '' ? '' : '0' : PreNum<L>}${A}`> : MinusOneFn<R, false, `${L}${A}`> : ToNumber<A>

type MinusOne<T extends number> = T extends 0 ? -1 : T extends 1 ? 0 : MinusOneFn<FlipText<`${T}`>>