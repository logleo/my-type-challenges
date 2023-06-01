// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>
];

// ============= Your Code Here =============
/**
 * 知识点：使用 -? 操作符设置必选属性。
 */
type Merge<T> = {
  [key in keyof T]: T[key];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<
  {
    [key in keyof T as key extends K ? key : never]-?: T[key];
  } & Omit<T, K>
>;
