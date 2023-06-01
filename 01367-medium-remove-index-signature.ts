// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol('foobar');
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

// ============= Your Code Here =============
/**
 * 知识点：
 * 1、对于 [key: string] 这样的索引签名，通过 keyof 获取到的键类型为 string | number。
 * 因为对象的键传入 number（例如1） 时，会被自动转换为 string（例如'1')，所以对于 [key: string]，会被编译器逆向推断为 string \ number 均可。
 * 2、索引签名可能的类型就是 PropertyKey，逐个过滤即可。
 */
type IsIndexSignature<T> = string extends T
  ? true
  : number extends T
  ? true
  : symbol extends T
  ? true
  : false;
type RemoveIndexSignature<T> = {
  [key in keyof T as IsIndexSignature<key> extends true ? never : key]: T[key];
};
