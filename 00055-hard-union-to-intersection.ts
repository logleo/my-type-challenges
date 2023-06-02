// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => 'foo') | ((i: 42) => true)>,
      (() => 'foo') & ((i: 42) => true)
    >
  >
];

// ============= Your Code Here =============
/**
 * 逆变和协变的产生与子类型（subtype）的使用有关，更多的知识可以参考下面这些文章：
 * - @see https://dmitripavlutin.com/typescript-covariance-contravariance/
 *
 * 逆变（contravariance）类似消费者，例如函数类型的参数，参数就是拿来使用的。
 * 协变（covariance）类似生产者，例如 Promise<T>、Record<K,V> 等，它们都是从一个类型衍生而来。
 *
 * 本题想要求交叉类型，所以使用逆变可以解决。
 */
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer P) => any
  ? P
  : never;


