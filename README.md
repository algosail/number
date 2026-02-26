# @algosail/number

Number comparison, ordering, and arithmetic utilities. All comparison functions are curried.

Notable semantics: `NaN` equals `NaN`, `-0` equals `+0`, `NaN` is treated as the minimum in ordering.

## Contents

- [isNum](#isnum)
- [equals](#equals)
- [lte / lt / gte / gt](#lte--lt--gte--gt)
- [min / max / clamp](#min--max--clamp)
- [negate](#negate)
- [add / sub / mult / div / pow](#add--sub--mult--div--pow)
- [sum / product](#sum--product)
- [even / odd](#even--odd)
- [parseFloat\_](#parsefloat_)
- [parseInt\_](#parseint_)

---

### isNum

```
isNum :: a -> Boolean
```

Returns `true` only for numeric values that are **not** `NaN`.

```js
isNum(42) // => true
isNum(-Infinity) // => true
isNum(NaN) // => false
isNum('42') // => false
isNum(null) // => false
```

---

### equals

```
equals :: Number -> Number -> Boolean
```

Structural equality: `NaN` equals `NaN`, `+0` equals `-0`.

```js
equals(1)(1) // => true
equals(NaN)(NaN) // => true   — unlike ===
equals(0)(-0) // => true
equals(1)(2) // => false
```

---

### lte / lt / gte / gt

```
lte :: Number -> Number -> Boolean
lt  :: Number -> Number -> Boolean
gte :: Number -> Number -> Boolean
gt  :: Number -> Number -> Boolean
```

Total ordering — `NaN` is treated as the minimum (less than everything).

```js
lte(1)(2) // => true
lte(2)(2) // => true
lt(1)(2) // => true
lt(2)(2) // => false

gte(2)(1) // => true
gt(2)(1) // => true

// NaN semantics
lte(NaN)(NaN) // => true  (NaN ≤ NaN)
lte(NaN)(-999) // => true  (NaN is minimum)
lte(-999)(NaN) // => false
```

---

### min / max / clamp

```
min   :: Number -> Number -> Number
max   :: Number -> Number -> Number
clamp :: Number -> Number -> Number -> Number
```

```js
min(3)(7) // => 3
max(3)(7) // => 7
clamp(0)(10)(5) // => 5
clamp(0)(10)(15) // => 10
clamp(0)(10)(-2) // => 0
```

---

### negate

```
negate :: Number -> Number
```

```js
negate(3) // => -3
negate(-5) // => 5
negate(0) // => 0
```

---

### add / sub / mult / div / pow

```
add  :: Number -> Number -> Number   — add(x)(y) = x + y
sub  :: Number -> Number -> Number   — sub(n)(x) = x - n
mult :: Number -> Number -> Number   — mult(x)(y) = x * y
div  :: Number -> Number -> Number   — div(n)(x) = x / n
pow  :: Number -> Number -> Number   — pow(exp)(base) = base ** exp
```

Note: `sub` and `div` take the _operand_ first, so they flip naturally in pipelines.

```js
add(1)(2) // => 3
sub(1)(3) // => 2   (3 - 1)
mult(2)(3) // => 6
div(2)(10) // => 5   (10 / 2)
pow(2)(3) // => 9   (3 ** 2)

// Pipeline example: (x - 1) / 2
pipe([sub(1), div(2)])(9) // => 4
```

---

### sum / product

```
sum     :: Array Number -> Number
product :: Array Number -> Number
```

```js
sum([1, 2, 3, 4]) // => 10
sum([]) // => 0

product([2, 3, 4]) // => 24
product([]) // => 1
```

---

### even / odd

```
even :: Integer -> Boolean
odd  :: Integer -> Boolean
```

```js
even(4) // => true
even(3) // => false
odd(3) // => true
odd(4) // => false
even(0) // => true
```

---

### parseFloat\_

```
parseFloat_ :: String -> Maybe Number
```

Parses a float string strictly — rejects strings with garbage characters that native `parseFloat` would accept.

```js
parseFloat_('3.14') // => just(3.14)
parseFloat_('-1e5') // => just(-100000)
parseFloat_('Infinity') // => just(Infinity)
parseFloat_('3px') // => nothing()   — native parseFloat would return 3
parseFloat_('') // => nothing()
parseFloat_('abc') // => nothing()
```

---

### parseInt\_

```
parseInt_ :: Integer -> String -> Maybe Integer
```

Parses an integer string in radix 2–36, stricter than the built-in `parseInt`.

```js
parseInt_(10)('42') // => just(42)
parseInt_(16)('ff') // => just(255)
parseInt_(2)('1010') // => just(10)
parseInt_(10)('42px') // => nothing()  — native parseInt would return 42
parseInt_(10)('') // => nothing()
parseInt_(1)('1') // => nothing()  — radix must be 2–36
```
