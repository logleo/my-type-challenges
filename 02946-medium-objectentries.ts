// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>
];

// ============= Your Code Here =============
/**
 * 处理特殊情况：
  interface Student {
    name?: string;
    age: undefined;
  }
 */
type OmitUndefined<T> = [T] extends [undefined]
  ? undefined
  : T extends undefined
  ? never
  : T;

type ObjectEntries<T, K = keyof T> = K extends keyof T
  ? [K, OmitUndefined<T[K]>]
  : never;
