// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>
];

// ============= Your Code Here =============
/**
 * 测试的检验是通过 TypeScript 内置的 isTypeIdenticalTo 进行判断的，而这个工具函数对于 A & B 这样的类型，判断是存在问题的，例如会认为 A & B 与 B & A 不相等。
 * 所以我们需要简单是想一个工具函数 Merge，把 A & B 这样的类型转换为一个整体的对象：
 */
type Merge<T> = {
  [key in keyof T]: T[key];
};

type PartialByKeys<T, K extends keyof T = keyof T> = Merge<
  {
    [key in keyof T as key extends K ? key : never]?: T[key];
  } & {
    [key in Exclude<keyof T, K>]: T[key];
  }
>;
