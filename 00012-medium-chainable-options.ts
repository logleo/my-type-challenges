// ============= Test Cases =============
import type { Alike, Expect } from './test-utils';

declare const a: Chainable;

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get();

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

// ============= Your Code Here =============
/**
 * Step 1: 基本的链式调用
 */
// type Chainable<T = {}> = {
//   option<K extends string, V>(key: K, value: V): Chainable<T & Record<K, V>>;
//   get(): T;
// };

/**
 * Step 2: 处理多次调用 option 时，相同 key 的情况
 * 题目提示：同样的 key 只会被使用一次。
 * 用例 2/3 希望重复设置 value 时抛出错误, 用例 3 还希望对应 value 设置为最近一次调用 option 时传入的类型。
 * （好奇怪的需求）
 */
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};

type nn = typeof result3;
