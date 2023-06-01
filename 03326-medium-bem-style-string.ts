// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
];

// ============= Your Code Here =============
/**
 * 知识点：联合类型在模板字符串中，也会进行分配律运算。
 * 
  type Name = 'Bob' | 'Alice'
  // Welcome 为 "Hello Bob!" | "Hello Alice!"
  type Welcome = `Hello ${Name[number]}!`
 */

type GetE<E extends string[]> = E extends [] ? '' : `__${E[number]}`;
type GetM<M extends string[]> = M extends [] ? '' : `--${M[number]}`;

type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${GetE<E>}${GetM<M>}`;
