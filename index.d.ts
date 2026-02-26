export declare const isNum: (a: unknown) => a is number
export declare const equals: (a: number) => (b: number) => boolean
export declare const lte: (a: number) => (b: number) => boolean
export declare const lt: (a: number) => (b: number) => boolean
export declare const gte: (a: number) => (b: number) => boolean
export declare const gt: (a: number) => (b: number) => boolean
export declare const min: (a: number) => (b: number) => number
export declare const max: (a: number) => (b: number) => number
export declare const clamp: (
  lo: number,
) => (hi: number) => (x: number) => number

import type { Maybe } from '@algosail/maybe'

// ── Sanctuary additions ────────────────────────────────────────────────────

export declare const negate: (n: number) => number
export declare const add: (x: number) => (y: number) => number
/** sub :: Number -> Number -> Number — sub(y)(x) = x - y */
export declare const sub: (y: number) => (x: number) => number
export declare const mult: (x: number) => (y: number) => number
/** div :: Number -> Number -> Number — div(y)(x) = x / y */
export declare const div: (y: number) => (x: number) => number
/** pow :: Number -> Number -> Number — pow(exp)(base) = base ^ exp */
export declare const pow: (exp: number) => (base: number) => number
export declare const sum: (ns: Array<number>) => number
export declare const product: (ns: Array<number>) => number
export declare const even: (n: number) => boolean
export declare const odd: (n: number) => boolean
/** parseFloat_ :: String -> Maybe Number */
export declare const parseFloat_: (s: string) => Maybe<number>
/** parseInt_ :: Integer -> String -> Maybe Integer */
export declare const parseInt_: (radix: number) => (s: string) => Maybe<number>
