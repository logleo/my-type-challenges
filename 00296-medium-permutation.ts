// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============
/**
 * Step 1. 利用联合类型 + 范型运算的特点（分配律），分解出数组
 */
type Permutation1<T> = T extends T ? [T] : never;

/**
 * Step 2. 递归获得剩余元素的组合
 */
type Permutation2<T, K = T> = K extends K
  ? [K, ...Permutation2<Exclude<T, K>>]
  : never;

/**
 * Step 3. 处理错误示例（never 类型，参见用例 5）
 */
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;
