# complex.ts

This is a fork of [Complex.js](https://github.com/rawify/Complex.js).
This is intended for my personal use.


## Examples

```js
import { Complex } from "../dist/complex.js";

let c = new Complex("99.3+8i");
c.mul({re: 3, im: 9}).div(4.9).sub(3, 2);
```

A classical use case for complex numbers is solving quadratic equations `ax² + bx + c = 0` for all `a, b, c ∈ ℝ`:

```js

function quadraticRoot(a, b, c) {
  let sqrt = Complex(b * b - 4 * a * c).sqrt()
  let x1 = Complex(-b).add(sqrt).div(2 * a)
  let x2 = Complex(-b).sub(sqrt).div(2 * a)
  return {x1, x2}
}

// quadraticRoot(1, 4, 5) -> -2 ± i
```

For cubic roots have a look at [RootFinder](https://github.com/rawify/RootFinder.js) which uses Complex.js.


## Parser

Any function (see below) as well as the constructor of the *Complex* class parses its input like this.

You can pass either Objects, Doubles or Strings.

### Objects

```javascript
new Complex({re: real, im: imaginary});
new Complex({arg: angle, abs: radius});
new Complex({phi: angle, r: radius});
new Complex([real, imaginary]); // Vector/Array syntax
```
If there are other attributes on the passed object, they're not getting preserved and have to be merged manually.

**Note:** Object attributes have to be of type Number to avoid undefined behavior.

### Doubles

```javascript
new Complex(55.4);
```

### Strings

```javascript
new Complex("123.45");
new Complex("15+3i");
new Complex("i");
```

### Two arguments

```javascript
new Complex(3, 2); // 3+2i
```


## Attributes

Every complex number object exposes its real and imaginary part as attribute `re` and `im`:

```javascript
let c = new Complex(3, 2);

console.log("Real part:", c.re); // 3
console.log("Imaginary part:", c.im); // 2
```


## Functions

Complex sign()
---
Returns the complex sign, defined as the complex number normalized by it's absolute value

Complex add(n)
---
Adds another complex number

Complex sub(n)
---
Subtracts another complex number

Complex mul(n)
---
Multiplies the number with another complex number

Complex div(n)
---
Divides the number by another complex number

Complex pow(exp)
---
Returns the number raised to the complex exponent (Note: `Complex.ZERO.pow(0) = Complex.ONE` by convention)

Complex sqrt()
---
Returns the complex square root of the number

Complex exp(n)
---
Returns `e^n` with complex exponent `n`.

Complex log()
---
Returns the natural logarithm (base `E`) of the actual complex number

_Note:_ The logarithm to a different base can be calculated with `z.log().div(Math.log(base))`.

double abs()
---
Calculates the magnitude of the complex number

double arg()
---
Calculates the angle of the complex number

Complex inverse()
---
Calculates the multiplicative inverse of the complex number (1 / z)

Complex conjugate()
---
Calculates the conjugate of the complex number (multiplies the imaginary part with -1)

Complex neg()
---
Negates the number (multiplies both the real and imaginary part with -1) in order to get the additive inverse

Complex floor([places=0])
---
Floors the complex number parts towards zero

Complex ceil([places=0])
---
Ceils the complex number parts off zero

Complex round([places=0])
---
Rounds the complex number parts

boolean equals(n)
---
Checks if both numbers are exactly the same, if both numbers are infinite they
are considered **not** equal.

boolean isNaN()
---
Checks if the given number is not a number

boolean isFinite()
---
Checks if the given number is finite

Complex clone()
---
Returns a new Complex instance with the same real and imaginary properties

Array toVector()
---
Returns a Vector of the actual complex number with two components

String toString()
---
Returns a string representation of the actual number. As of v1.9.0 the output is a bit more human readable

```javascript
new Complex(1, 2).toString(); // 1 + 2i
new Complex(0, 1).toString(); // i
new Complex(9, 0).toString(); // 9
new Complex(1, 1).toString(); // 1 + i
```

double valueOf()
---
Returns the real part of the number if imaginary part is zero. Otherwise `null`


## Trigonometric functions

The following trigonometric functions are defined on Complex.js:

| Trig | Arcus | Hyperbolic | Area-Hyperbolic |
|------|-------|------------|------------------|
| sin()  | asin()  | sinh()       | asinh()            |
| cos()  | acos()  | cosh()       | acosh()            |
| tan()  | atan()  | tanh()       | atanh()            |
| cot()  | acot()  | coth()       | acoth()            |
| sec()  | asec()  | sech()       | asech()            |
| csc()  | acsc()  | csch()       | acsch()            |


## Geometric Equivalence

Complex numbers can also be seen as a vector in the 2D space. Here is a simple overview of basic operations and how to implement them with complex.js:

New vector
---
```js
let v1 = new Complex(1, 0);
let v2 = new Complex(1, 1);
```

Scale vector
---
```js
scale(v1, factor):= v1.mul(factor)
```

Vector norm
---
```js
norm(v):= v.abs()
```

Translate vector
---
```js
translate(v1, v2):= v1.add(v2)
```

Rotate vector around center
---
```js
rotate(v, angle):= v.mul({abs: 1, arg: angle})
```

Rotate vector around a point
---
```js
rotate(v, p, angle):= v.sub(p).mul({abs: 1, arg: angle}).add(p)
```

Distance to another vector
---
```js
distance(v1, v2):= v1.sub(v2).abs()
```

## Constants


Complex.ZERO
---
A complex zero value (south pole on the Riemann Sphere)

Complex.ONE
---
A complex one instance

Complex.INFINITY
---
A complex infinity value (north pole on the Riemann Sphere)

Complex.NAN
---
A complex NaN value (not on the Riemann Sphere)

Complex.I
---
An imaginary number i instance

Complex.PI
---
A complex PI instance

Complex.E
---
A complex euler number instance

Complex.EPSILON
---
A small epsilon value used for `equals()` comparison in order to circumvent double imprecision.


## Installation

You can install `Complex.js` via npm:

```bash
npm install complex.js
```

Or with yarn:

```bash
yarn add complex.js
```

Alternatively, download or clone the repository:

```bash
git clone https://github.com/rawify/Complex.js
```

## Usage

Include the `complex.min.js` file in your project:

```html
<script src="path/to/complex.min.js"></script>
<script>
    console.log(Complex("4+3i"));
</script>
```

Or in a Node.js project:

```javascript
import { Complex } from "../dist/complex.js";
```

or 

```javascript
import { Complex } from "../dist/complex.js";
```

## Building the library

After cloning the Git repository run:

```
npm install
npm run build
```

## Run a test

For testing I use Node js native test runner.

```
npm run test
```

## Copyright and Licensing

Copyright (c) 2024, [Robert Eisele](https://raw.org/)
Licensed under the MIT license.
