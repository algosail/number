// number.js – Number comparison and arithmetic.
//
// Notable semantics:
//   NaN equals NaN, -0 equals +0, NaN lte everything.

import * as M from '@algosail/maybe'

/**
 * isNum :: a -> Boolean
 * Returns true only for finite or infinite (non-NaN) numbers.
 * @example isNum(42) // => true;  isNum(NaN) // => false
 */
export const isNum = (a) => typeof a === 'number' && !Number.isNaN(a)

/**
 * equals :: Number -> Number -> Boolean
 * Structural equality: NaN equals NaN, +0 equals -0.
 * @example equals(NaN)(NaN) // => true
 */
export const equals = (a) => (b) => {
  const x = isNum(a) ? a : NaN
  const y = isNum(b) ? b : NaN
  return (Number.isNaN(x) && Number.isNaN(y)) || x === y
}

/**
 * lte :: Number -> Number -> Boolean
 * Total ordering — NaN is treated as the minimum value.
 * @example lte(1)(2) // => true
 */
export const lte = (a) => (b) => {
  const x = isNum(a) ? a : NaN
  const y = isNum(b) ? b : NaN
  return Number.isNaN(x) || x <= y
}

/**
 * lt :: Number -> Number -> Boolean
 * Strict less-than.
 * @example lt(1)(2) // => true
 */
export const lt = (a) => (b) => lte(a)(b) && !lte(b)(a)

/**
 * gte :: Number -> Number -> Boolean
 * Greater-than-or-equal.
 * @example gte(2)(1) // => true
 */
export const gte = (a) => (b) => lte(b)(a)

/**
 * gt :: Number -> Number -> Boolean
 * Strict greater-than.
 * @example gt(2)(1) // => true
 */
export const gt = (a) => (b) => lte(b)(a) && !lte(a)(b)

/**
 * min :: Number -> Number -> Number
 * Returns the smaller number.
 * @example min(1)(2) // => 1
 */
export const min = (a) => (b) => (lte(a)(b) ? a : b)

/**
 * max :: Number -> Number -> Number
 * Returns the larger number.
 * @example max(1)(2) // => 2
 */
export const max = (a) => (b) => (lte(b)(a) ? a : b)

/**
 * clamp :: Number -> Number -> Number -> Number
 * Clamps x between lo and hi inclusive.
 * @example clamp(0)(10)(15) // => 10
 */
export const clamp = (lo) => (hi) => (x) =>
  lte(x)(lo) ? lo : lte(hi)(x) ? hi : x

// =============================================================================
// Arithmetic
// =============================================================================

/**
 * negate :: Number -> Number
 * Negates a number.
 * @example negate(3) // => -3
 */
export const negate = (n) => -n

/**
 * add :: Number -> Number -> Number
 * Adds two numbers.
 * @example add(1)(2) // => 3
 */
export const add = (x) => (y) => x + y

/**
 * sub :: Number -> Number -> Number
 * Subtracts — sub(n)(x) = x - n.
 * @example sub(1)(3) // => 2
 */
export const sub = (y) => (x) => x - y

/**
 * mult :: Number -> Number -> Number
 * Multiplies two numbers.
 * @example mult(2)(3) // => 6
 */
export const mult = (x) => (y) => x * y

/**
 * div :: Number -> Number -> Number
 * Divides — div(n)(x) = x / n.
 * @example div(2)(10) // => 5
 */
export const div = (y) => (x) => x / y

/**
 * pow :: Number -> Number -> Number
 * Raises base to exponent — pow(exp)(base) = base ** exp.
 * @example pow(2)(3) // => 9
 */
export const pow = (exp) => (base) => Math.pow(base, exp)

/**
 * sum :: Array Number -> Number
 * Sums all numbers in the array.
 * @example sum([1, 2, 3]) // => 6
 */
export const sum = (ns) => ns.reduce((a, b) => a + b, 0)

/**
 * product :: Array Number -> Number
 * Multiplies all numbers in the array.
 * @example product([2, 3, 4]) // => 24
 */
export const product = (ns) => ns.reduce((a, b) => a * b, 1)

// =============================================================================
// Integer predicates
// =============================================================================

/**
 * even :: Integer -> Boolean
 * Returns true for even integers.
 * @example even(4) // => true
 */
export const even = (n) => n % 2 === 0

/**
 * odd :: Integer -> Boolean
 * Returns true for odd integers.
 * @example odd(3) // => true
 */
export const odd = (n) => n % 2 !== 0

// =============================================================================
// Parse
// =============================================================================

const _validFloat =
  /^\s*[+-]?(?:Infinity|NaN|(?:[0-9]+|[0-9]+[.][0-9]+|[0-9]+[.]|[.][0-9]+)(?:[Ee][+-]?[0-9]+)?)\s*$/

/**
 * parseFloat_ :: String -> Maybe Number
 * Parses a float string strictly — Just on success, Nothing otherwise.
 * @example parseFloat_('3.14') // => just(3.14)
 */
export const parseFloat_ = (s) =>
  _validFloat.test(s) ? M.just(parseFloat(s)) : M.nothing()

/**
 * parseInt_ :: Integer -> String -> Maybe Integer
 * Parses an integer string in radix 2–36 — stricter than built-in parseInt.
 * @example parseInt_(16)('ff') // => just(255)
 */
export const parseInt_ = (radix) => (s) => {
  if (!Number.isInteger(radix) || radix < 2 || radix > 36) return M.nothing()
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, radix)
  const pattern = new RegExp(`^[${charset}]+$`, 'i')
  const t = s.replace(/^[+-]/, '')
  const u = radix === 16 ? t.replace(/^0x/i, '') : t
  if (!pattern.test(u)) return M.nothing()
  const n = parseInt(s, radix)
  return Number.isInteger(n) ? M.just(n) : M.nothing()
}
