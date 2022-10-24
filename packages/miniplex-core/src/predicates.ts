import { Predicate, WithOptionalKeys, WithRequiredKeys } from "./types"

function memoize<A, B extends Function>(
  store: A extends object ? Map<A, B> | WeakMap<A, B> : Map<A, B>,
  from: A,
  to: B
): B {
  if (store.has(from)) return store.get(from)! as B
  store.set(from, to)
  return to
}

const stores = {
  not: new WeakMap<Function, Function>(),
  all: new Map<string, Function>(),
  any: new Map<string, Function>(),
  none: new Map<string, Function>()
}

export const key = (components: any[]) =>
  JSON.stringify([...new Set(components.sort().filter((p) => !!p && p !== ""))])

/**
 * Returns a predicate function that inverts the given predicate function.
 * The returned function is memoized, so this function will always return
 * the same function (by identity) for the same predicate passed into it.
 *
 * @param predicate The predicate function to invert.
 * @returns A new predicate function reversing the given function.
 */
export function not<E>(predicate: (entity: E) => boolean) {
  return memoize(
    stores.not,
    predicate,
    (entity: E) => !predicate(entity)
  ) as typeof predicate
}

export function all<E = any, C extends keyof E = any>(...components: C[]) {
  return memoize(stores.all, key(components), (entity: E) =>
    components.every((c) => entity[c] !== undefined)
  ) as Predicate<E, WithRequiredKeys<E, C>>
}

export function any<E = any, C extends keyof E = any>(...components: C[]) {
  return memoize(stores.any, key(components), (entity: E) =>
    components.some((c) => entity[c] !== undefined)
  ) as Predicate<E, WithOptionalKeys<E, C>>
}

export function none<E = any, C extends keyof E = any>(...components: C[]) {
  return memoize(stores.none, key(components), (entity: E) =>
    components.every((c) => entity[c] === undefined)
  ) as Predicate<E, WithOptionalKeys<E, C>>
}
