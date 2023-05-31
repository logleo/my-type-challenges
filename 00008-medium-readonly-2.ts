// ============= Test Cases =============
import type { Alike, Expect } from './test-utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============
// 不存在 K 的时候，给默认值
// 被指定的属性设置为 readonly，其余属性保持原样（使用 Omit/Exclude）
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [Key in K]: T[Key];
} & Omit<T, K>;
