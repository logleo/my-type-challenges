// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});

// ============= Your Code Here =============
type GetComputed<T> = T extends Record<string, (...args: any[]) => any>
  ? { [key in keyof T]: ReturnType<T[key]> }
  : never;

/**
 * 1、在 data 的上下文中，不应该能获取其他的计算属性或方法，所以应该将 this 声明为 void。
 * 2、在计算属性和方法的上下文中，获取到的不应该是 data 的类型，而应该是它返回对象的类型。
 * 3、在计算属性和方法的上下文中，获取到的不应该是 computed 中每一个函数的类型，而应该是它们的返回类型。
 * 
 * 对于问题 1 和问题 2，将 data?: D 修改成 data?: (this: void) => D 即可。
 * 对于问题 3，我们可以专门写一个工具类型 GetComputed，结合 TypeScript 提供的 ReturnType 类型，获取每一个函数的返回类型：
 */
declare function SimpleVue<D, C, M>(
  options: {
    data?: (this: void) => D;
    computed?: C;
    methods?: M;
  } & ThisType<D & M & GetComputed<C>>
): any;
