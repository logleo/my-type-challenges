// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];

// ============= Your Code Here =============
/**
 * 用 Required<T> 来实现巧妙的过滤
 */
type GetRequired<T> = {
  [key in keyof T as T[key] extends Required<T>[key] ? key : never]: T[key];
};
