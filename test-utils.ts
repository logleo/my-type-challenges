export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

/**
 * 原理是当条件类型中的 T 未知时，会延迟到调用时进行判断，判断时会调用 TypeScript 内部的 isTypeIdenticalTo 方法。
 * 当且仅当两个条件类型满足如下条件时返回 true：
 * - 两个条件类型的约束（constraint）相同
 * - 两个条件类型的 true / false 分支值相同
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false
export type NotAny<T> = true extends IsAny<T> ? false : true

export type Debug<T> = { [K in keyof T]: T[K] }
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false
export type ExpectValidArgs<
  FUNC extends (...args: any[]) => any,
  ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never
