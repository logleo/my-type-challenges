// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
];

// ============= Your Code Here =============
/** 驼峰转中划线，分为两个部分：
 * 1、总是处理第一个字符为小写
 * 2、剩余部分判断是否首字母大写，是的话补充中划线，并继续递归。
 * （利用原生类型 Uncapitalize 获得首字母小写形式）
 */
type KebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<L>}${KebabCase<R>}`
    : `${Lowercase<L>}-${KebabCase<R>}`
  : S;
