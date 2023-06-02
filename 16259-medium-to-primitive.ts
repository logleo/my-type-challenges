// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

// ============= Your Code Here =============
/**
 * 用例中包含函数类型，需要优先处理。
 * 
 * 小技巧：对于数组和对象而言，它们都可以算作是 Record 类型：
 * - 对于对象而言，[K in keyof T] 获取到的是对象的 key；
 * - 对于数组而言，[K in keyof T] 获取到的是数组的下标。
 *
 * 所以对于数组和对象，都可以通过 [K in keyof T]: ToPrimitive<T[K]> 的方式，实现对每一个元素的递归判断类型。
 */
type ToPrimitive<T> = T extends Function
  ? Function
  : T extends Record<any, any>
  ? {
      [K in keyof T]: ToPrimitive<T[K]>;
    }
  : T extends number
  ? number
  : T extends string
  ? string
  : T extends boolean
  ? boolean
  : never;
