// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];

// ============= Your Code Here =============
/**
 * 跟 GetRequired 思路一样。
 */
type GetOptional<T> = {
  [k in keyof T as T[k] extends Required<T>[k] ? never : k]?: T[k];
};
