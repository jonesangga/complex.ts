/**
 * @license Complex.js v2.4.2 11/5/2024
 * https://raw.org/article/complex-numbers-in-javascript/
 *
 * Copyright (c) 2024, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 **/
const cosh = Math.cosh || function (x) {
    return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
};
const sinh = Math.sinh || function (x) {
    return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
};
// Calculates cos(x) - 1 using Taylor series if x is small (-¼π ≤ x ≤ ¼π).
function cosm1(x) {
    const b = Math.PI / 4;
    if (-b > x || x > b) {
        return Math.cos(x) - 1.0;
    }
    /* Calculate horner form of polynomial of taylor series in Q
  let fac = 1, alt = 1, pol = {};
  for (let i = 0; i <= 16; i++) {
    fac*= i || 1;
    if (i % 2 == 0) {
      pol[i] = new Fraction(1, alt * fac);
      alt = -alt;
    }
  }
  console.log(new Polynomial(pol).toHorner()); // (((((((1/20922789888000x^2-1/87178291200)x^2+1/479001600)x^2-1/3628800)x^2+1/40320)x^2-1/720)x^2+1/24)x^2-1/2)x^2+1
  */
    const xx = x * x;
    return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888000
        - 1 / 87178291200)
        + 1 / 479001600)
        - 1 / 3628800)
        + 1 / 40320)
        - 1 / 720)
        + 1 / 24)
        - 1 / 2);
}
;
function hypot(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    // Ensure `x` is the larger value
    if (x < y)
        [x, y] = [y, x];
    // If both are below the threshold, use straightforward Pythagoras
    if (x < 1e8)
        return Math.sqrt(x * x + y * y);
    // For larger values, scale to avoid overflow
    y /= x;
    return x * Math.sqrt(1 + y * y);
}
;
// Calculates log(sqrt(a^2 + b^2)) in a way to avoid overflows
function logHypot(a, b) {
    const _a = Math.abs(a);
    const _b = Math.abs(b);
    if (a === 0) {
        return Math.log(_b);
    }
    if (b === 0) {
        return Math.log(_a);
    }
    if (_a < 3000 && _b < 3000) {
        return Math.log(a * a + b * b) * 0.5;
    }
    /* I got 4 ideas to compute this property without overflow:
     *
     * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
     *
     * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

   Math.log(a * a + b * b) / 2

     *
     *
     * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

   const fn = function(a, b) {
   a = Math.abs(a);
   b = Math.abs(b);
   let t = Math.min(a, b);
   a = Math.max(a, b);
   t = t / a;

   return Math.log(a) + Math.log(1 + t * t) / 2;
   };

     * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

   Math.log(a / Math.cos(Math.atan2(b, a)))

     * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

   Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

*/
    a = a * 0.5;
    b = b * 0.5;
    return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}
function parser_exit() {
    throw SyntaxError('Invalid Param');
}
;
function parse(a, b) {
    const z = { re: 0, im: 0 };
    if (a === undefined || a === null) {
        z.re = 0;
        z.im = 0;
    }
    else if (typeof b === "number") {
        if (typeof a === "number") {
            z.re = a;
            z.im = b;
        }
        else {
            z.re = NaN;
            z.im = NaN;
        }
    }
    else {
        switch (typeof a) {
            case 'object': {
                if ('im' in a && 're' in a) {
                    z.re = a.re;
                    z.im = a.im;
                }
                else if ('abs' in a && 'arg' in a) {
                    if (!isFinite(a['abs']) && isFinite(a['arg'])) {
                        return Complex['INFINITY'];
                    }
                    z.re = a['abs'] * Math.cos(a['arg']);
                    z.im = a['abs'] * Math.sin(a['arg']);
                }
                else if ('r' in a && 'phi' in a) {
                    if (!isFinite(a['r']) && isFinite(a['phi'])) {
                        return Complex['INFINITY'];
                    }
                    z.re = a['r'] * Math.cos(a['phi']);
                    z.im = a['r'] * Math.sin(a['phi']);
                }
                else if (a.length === 2) { // Quick array check
                    z.re = a[0];
                    z.im = a[1];
                }
                else {
                    parser_exit();
                }
                break;
            }
            case 'string': {
                z.im = /* void */
                    z.re = 0;
                const tokens = a.replace(/_/g, '')
                    .match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
                let plus = 1;
                let minus = 0;
                if (tokens === null) {
                    parser_exit();
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        const c = tokens[i];
                        if (c === ' ' || c === '\t' || c === '\n') {
                            /* void */
                        }
                        else if (c === '+') {
                            plus++;
                        }
                        else if (c === '-') {
                            minus++;
                        }
                        else if (c === 'i' || c === 'I') {
                            if (plus + minus === 0) {
                                parser_exit();
                            }
                            if (tokens[i + 1] !== ' ' && !isNaN(parseInt(tokens[i + 1]))) {
                                z.im += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
                                i++;
                            }
                            else {
                                z.im += parseFloat((minus % 2 ? '-' : '') + '1');
                            }
                            plus = minus = 0;
                        }
                        else {
                            if (plus + minus === 0 || isNaN(parseInt(c))) {
                                parser_exit();
                            }
                            if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                                z.im += parseFloat((minus % 2 ? '-' : '') + c);
                                i++;
                            }
                            else {
                                z.re += parseFloat((minus % 2 ? '-' : '') + c);
                            }
                            plus = minus = 0;
                        }
                    }
                    // Still something on the stack
                    if (plus + minus > 0) {
                        parser_exit();
                    }
                }
                break;
            }
            case 'number': {
                z.im = 0;
                z.re = a;
                break;
            }
            default:
                parser_exit();
        }
    }
    // NOTE: If a calculation is NaN, we treat it as NaN and don't throw
    // if (isNaN(z.re) || isNaN(z.im)) {
    //parser_exit();
    // }
    return z;
}
;
export class Complex {
    static ZERO = new Complex(0, 0);
    static ONE = new Complex(1, 0);
    static I = new Complex(0, 1);
    static PI = new Complex(Math.PI, 0);
    static E = new Complex(Math.E, 0);
    static INFINITY = new Complex(Infinity, Infinity);
    static NAN = new Complex(NaN, NaN);
    static EPSILON = 1e-15;
    re;
    im;
    constructor(a, b) {
        const z = parse(a, b);
        this.re = z.re;
        this.im = z.im;
    }
    // Calculates the sign of a complex number, which is a normalized complex
    sign() {
        const abs = hypot(this.re, this.im);
        return new Complex(this.re / abs, this.im / abs);
    }
    add(a, b) {
        const z = parse(a, b);
        const tInfin = this['isInfinite']();
        const zInfin = !(isFinite(z.re) && isFinite(z.im));
        if (tInfin || zInfin) {
            if (tInfin && zInfin) {
                // Infinity + Infinity = NaN
                return Complex['NAN'];
            }
            // Infinity + z = Infinity { where z != Infinity }
            return Complex['INFINITY'];
        }
        return new Complex(this.re + z.re, this.im + z.im);
    }
    sub(a, b) {
        const z = parse(a, b);
        const tInfin = this['isInfinite']();
        const zInfin = !(isFinite(z.re) && isFinite(z.im));
        if (tInfin || zInfin) {
            if (tInfin && zInfin) {
                // Infinity - Infinity = NaN
                return Complex['NAN'];
            }
            // Infinity - z = Infinity { where z != Infinity }
            return Complex['INFINITY'];
        }
        return new Complex(this.re - z.re, this.im - z.im);
    }
    mul(a, b) {
        const z = parse(a, b);
        const tInfin = this['isInfinite']();
        const zInfin = !(isFinite(z.re) && isFinite(z.im));
        const tIsZero = this.re === 0 && this.im === 0;
        const zIsZero = z.re === 0 && z.im === 0;
        // Infinity * 0 = NaN
        if (tInfin && zIsZero || zInfin && tIsZero) {
            return Complex['NAN'];
        }
        // Infinity * z = Infinity { where z != 0 }
        if (tInfin || zInfin) {
            return Complex['INFINITY'];
        }
        // Shortcut for real values
        if (z.im === 0 && this.im === 0) {
            return new Complex(this.re * z.re, 0);
        }
        return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
    }
    div(a, b) {
        const z = parse(a, b);
        const tInfin = this['isInfinite']();
        const zInfin = !(isFinite(z.re) && isFinite(z.im));
        const tIsZero = this.re === 0 && this.im === 0;
        const zIsZero = z.re === 0 && z.im === 0;
        // 0 / 0 = NaN and Infinity / Infinity = NaN
        if (tIsZero && zIsZero || tInfin && zInfin) {
            return Complex['NAN'];
        }
        // Infinity / 0 = Infinity
        if (zIsZero || tInfin) {
            return Complex['INFINITY'];
        }
        // 0 / Infinity = 0
        if (tIsZero || zInfin) {
            return Complex['ZERO'];
        }
        if (0 === z.im) {
            // Divisor is real
            return new Complex(this.re / z.re, this.im / z.re);
        }
        if (Math.abs(z.re) < Math.abs(z.im)) {
            const x = z.re / z.im;
            const t = z.re * x + z.im;
            return new Complex((this.re * x + this.im) / t, (this.im * x - this.re) / t);
        }
        else {
            const x = z.im / z.re;
            const t = z.im * x + z.re;
            return new Complex((this.re + this.im * x) / t, (this.im - this.re * x) / t);
        }
    }
    // Calculate the power of two complex numbers
    pow(a, b) {
        const z = parse(a, b);
        const tIsZero = this.re === 0 && this.im === 0;
        const zIsZero = z.re === 0 && z.im === 0;
        if (zIsZero) {
            return Complex['ONE'];
        }
        // If the exponent is real
        if (z.im === 0) {
            if (this.im === 0 && this.re > 0) {
                return new Complex(Math.pow(this.re, z.re), 0);
            }
            else if (this.re === 0) { // If base is fully imaginary
                switch ((z.re % 4 + 4) % 4) {
                    case 0:
                        return new Complex(Math.pow(this.im, z.re), 0);
                    case 1:
                        return new Complex(0, Math.pow(this.im, z.re));
                    case 2:
                        return new Complex(-Math.pow(this.im, z.re), 0);
                    case 3:
                        return new Complex(0, -Math.pow(this.im, z.re));
                }
            }
        }
        /* I couldn't find a good formula, so here is a derivation and optimization
         *
         * z_1^z_2 = (a + bi)^(c + di)
         *         = exp((c + di) * log(a + bi)
         *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
         * =>...
         * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
         * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
         *
         * =>...
         * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
         * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
         *
         * =>
         * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
         * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
         *
         */
        if (tIsZero && z.re > 0) { // Same behavior as Wolframalpha, Zero if real part is zero
            return Complex['ZERO'];
        }
        const arg = Math.atan2(this.im, this.re);
        const loh = logHypot(this.re, this.im);
        const re = Math.exp(z.re * loh - z.im * arg);
        const im = z.im * loh + z.re * arg;
        return new Complex(re * Math.cos(im), re * Math.sin(im));
    }
    sqrt() {
        const a = this.re;
        const b = this.im;
        if (b === 0) {
            // Real number case
            if (a >= 0) {
                return new Complex(Math.sqrt(a), 0);
            }
            else {
                return new Complex(0, Math.sqrt(-a));
            }
        }
        const r = hypot(a, b);
        const re = Math.sqrt(0.5 * (r + Math.abs(a))); // sqrt(2x) / 2 = sqrt(x / 2)
        const im = Math.abs(b) / (2 * re);
        if (a >= 0) {
            return new Complex(re, b < 0 ? -im : im);
        }
        else {
            return new Complex(im, b < 0 ? -re : re);
        }
    }
    exp() {
        const er = Math.exp(this.re);
        if (this.im === 0) {
            return new Complex(er, 0);
        }
        return new Complex(er * Math.cos(this.im), er * Math.sin(this.im));
    }
    // Calculate the complex exponent and subtracts one.
    // This may be more accurate than `Complex(x).exp().sub(1)` if `x` is small.
    expm1() {
        /**
         * exp(a + i*b) - 1
     = exp(a) * (cos(b) + j*sin(b)) - 1
     = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
     */
        const a = this.re;
        const b = this.im;
        return new Complex(Math.expm1(a) * Math.cos(b) + cosm1(b), Math.exp(a) * Math.sin(b));
    }
    // Calculate the natural log
    log() {
        const a = this.re;
        const b = this.im;
        if (b === 0 && a > 0) {
            return new Complex(Math.log(a), 0);
        }
        return new Complex(logHypot(a, b), Math.atan2(b, a));
    }
    // Calculate the magnitude of the complex number
    abs() {
        return hypot(this.re, this.im);
    }
    // Calculate the angle of the complex number
    arg() {
        return Math.atan2(this.im, this.re);
    }
    sin() {
        // sin(z) = ( e^iz - e^-iz ) / 2i 
        //        = sin(a)cosh(b) + i cos(a)sinh(b)
        const a = this.re;
        const b = this.im;
        return new Complex(Math.sin(a) * cosh(b), Math.cos(a) * sinh(b));
    }
    cos() {
        // cos(z) = ( e^iz + e^-iz ) / 2 
        //        = cos(a)cosh(b) - i sin(a)sinh(b)
        const a = this.re;
        const b = this.im;
        return new Complex(Math.cos(a) * cosh(b), -Math.sin(a) * sinh(b));
    }
    tan() {
        // tan(z) = sin(z) / cos(z) 
        //        = ( e^iz - e^-iz ) / ( i( e^iz + e^-iz ) )
        //        = ( e^2iz - 1 ) / i( e^2iz + 1 )
        //        = ( sin(2a) + i sinh(2b) ) / ( cos(2a) + cosh(2b) )
        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = Math.cos(a) + cosh(b);
        return new Complex(Math.sin(a) / d, sinh(b) / d);
    }
    cot() {
        // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))
        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = Math.cos(a) - cosh(b);
        return new Complex(-Math.sin(a) / d, sinh(b) / d);
    }
    sec() {
        // sec(c) = 2 / (e^(ci) + e^(-ci))
        const a = this.re;
        const b = this.im;
        const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);
        return new Complex(Math.cos(a) * cosh(b) / d, Math.sin(a) * sinh(b) / d);
    }
    csc() {
        // csc(c) = 2i / (e^(ci) - e^(-ci))
        const a = this.re;
        const b = this.im;
        const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
        return new Complex(Math.sin(a) * cosh(b) / d, -Math.cos(a) * sinh(b) / d);
    }
    asin() {
        // asin(c) = -i * log(ci + sqrt(1 - c^2))
        const a = this.re;
        const b = this.im;
        const t1 = new Complex(b * b - a * a + 1, -2 * a * b)['sqrt']();
        const t2 = new Complex(t1.re - b, t1.im + a)['log']();
        return new Complex(t2.im, -t2.re);
    }
    acos() {
        // acos(c) = i * log(c - i * sqrt(1 - c^2))
        const a = this.re;
        const b = this.im;
        const t1 = new Complex(b * b - a * a + 1, -2 * a * b)['sqrt']();
        const t2 = new Complex(t1.re - b, t1.im + a)['log']();
        return new Complex(Math.PI / 2 - t2.im, t2.re);
    }
    atan() {
        // atan(c) = i / 2 log((i + x) / (i - x))
        const a = this.re;
        const b = this.im;
        if (a === 0) {
            if (b === 1) {
                return new Complex(0, Infinity);
            }
            if (b === -1) {
                return new Complex(0, -Infinity);
            }
        }
        const d = a * a + (1.0 - b) * (1.0 - b);
        const t1 = new Complex((1 - b * b - a * a) / d, -2 * a / d).log();
        return new Complex(-0.5 * t1.im, 0.5 * t1.re);
    }
    acot() {
        // acot(c) = i / 2 log((c - i) / (c + i))
        const a = this.re;
        const b = this.im;
        if (b === 0) {
            return new Complex(Math.atan2(1, a), 0);
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).atan()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).atan();
    }
    asec() {
        // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))
        const a = this.re;
        const b = this.im;
        if (a === 0 && b === 0) {
            return new Complex(0, Infinity);
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).acos()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).acos();
    }
    acsc() {
        // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
        const a = this.re;
        const b = this.im;
        if (a === 0 && b === 0) {
            return new Complex(Math.PI / 2, Infinity);
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).asin()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).asin();
    }
    sinh() {
        // sinh(c) = (e^c - e^-c) / 2
        const a = this.re;
        const b = this.im;
        return new Complex(sinh(a) * Math.cos(b), cosh(a) * Math.sin(b));
    }
    cosh() {
        // cosh(c) = (e^c + e^-c) / 2
        const a = this.re;
        const b = this.im;
        return new Complex(cosh(a) * Math.cos(b), sinh(a) * Math.sin(b));
    }
    tanh() {
        // tanh(c) = (e^c - e^-c) / (e^c + e^-c)
        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = cosh(a) + Math.cos(b);
        return new Complex(sinh(a) / d, Math.sin(b) / d);
    }
    coth() {
        // coth(c) = (e^c + e^-c) / (e^c - e^-c)
        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = cosh(a) - Math.cos(b);
        return new Complex(sinh(a) / d, -Math.sin(b) / d);
    }
    csch() {
        // csch(c) = 2 / (e^c - e^-c)
        const a = this.re;
        const b = this.im;
        const d = Math.cos(2 * b) - cosh(2 * a);
        return new Complex(-2 * sinh(a) * Math.cos(b) / d, 2 * cosh(a) * Math.sin(b) / d);
    }
    sech() {
        // sech(c) = 2 / (e^c + e^-c)
        const a = this.re;
        const b = this.im;
        const d = Math.cos(2 * b) + cosh(2 * a);
        return new Complex(2 * cosh(a) * Math.cos(b) / d, -2 * sinh(a) * Math.sin(b) / d);
    }
    asinh() {
        // asinh(c) = log(c + sqrt(c^2 + 1))
        let tmp = this.im;
        this.im = -this.re;
        this.re = tmp;
        const res = this['asin']();
        this.re = -this.im;
        this.im = tmp;
        tmp = res.re;
        res.re = -res.im;
        res.im = tmp;
        return res;
    }
    acosh() {
        // acosh(c) = log(c + sqrt(c^2 - 1))
        const res = this['acos']();
        if (res.im <= 0) {
            const tmp = res.re;
            res.re = -res.im;
            res.im = tmp;
        }
        else {
            const tmp = res.im;
            res.im = -res.re;
            res.re = tmp;
        }
        return res;
    }
    atanh() {
        // atanh(c) = log((1+c) / (1-c)) / 2
        const a = this.re;
        const b = this.im;
        const noIM = a > 1 && b === 0;
        const oneMinus = 1 - a;
        const onePlus = 1 + a;
        const d = oneMinus * oneMinus + b * b;
        const x = (d !== 0)
            ? new Complex((onePlus * oneMinus - b * b) / d, (b * oneMinus + onePlus * b) / d)
            : new Complex((a !== -1) ? (a / 0) : 0, (b !== 0) ? (b / 0) : 0);
        const temp = x.re;
        x.re = logHypot(x.re, x.im) / 2;
        x.im = Math.atan2(x.im, temp) / 2;
        if (noIM) {
            x.im = -x.im;
        }
        return x;
    }
    acoth() {
        // acoth(c) = log((c+1) / (c-1)) / 2
        const a = this.re;
        const b = this.im;
        if (a === 0 && b === 0) {
            return new Complex(0, Math.PI / 2);
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).atanh()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).atanh();
    }
    acsch() {
        // acsch(c) = log((1+sqrt(1+c^2))/c)
        const a = this.re;
        const b = this.im;
        if (b === 0) {
            return new Complex((a !== 0)
                ? Math.log(a + Math.sqrt(a * a + 1))
                : Infinity, 0);
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).asinh()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).asinh();
    }
    asech() {
        // asech(c) = log((1+sqrt(1-c^2))/c)
        const a = this.re;
        const b = this.im;
        if (this['isZero']()) {
            return Complex['INFINITY'];
        }
        const d = a * a + b * b;
        return (d !== 0)
            ? new Complex(a / d, -b / d).acosh()
            : new Complex((a !== 0) ? a / 0 : 0, (b !== 0) ? -b / 0 : 0).acosh();
    }
    // Calculate the complex inverse 1/z
    inverse() {
        // 1 / 0 = Infinity and 1 / Infinity = 0
        if (this['isZero']()) {
            return Complex['INFINITY'];
        }
        if (this['isInfinite']()) {
            return Complex['ZERO'];
        }
        const a = this.re;
        const b = this.im;
        const d = a * a + b * b;
        return new Complex(a / d, -b / d);
    }
    conjugate() {
        return new Complex(this.re, -this.im);
    }
    // Gets the negated complex number
    neg() {
        return new Complex(-this.re, -this.im);
    }
    ceil(places) {
        places = Math.pow(10, places || 0);
        return new Complex(Math.ceil(this.re * places) / places, Math.ceil(this.im * places) / places);
    }
    floor(places) {
        places = Math.pow(10, places || 0);
        return new Complex(Math.floor(this.re * places) / places, Math.floor(this.im * places) / places);
    }
    round(places) {
        places = Math.pow(10, places || 0);
        return new Complex(Math.round(this.re * places) / places, Math.round(this.im * places) / places);
    }
    // Compares two complex numbers
    // Note: new Complex(Infinity).equals(Infinity) === false
    equals(a, b) {
        const z = parse(a, b);
        return Math.abs(z.re - this.re) <= Complex.EPSILON &&
            Math.abs(z.im - this.im) <= Complex.EPSILON;
    }
    clone() {
        return new Complex(this.re, this.im);
    }
    // Gets a string of the actual complex number
    toString() {
        let a = this.re;
        let b = this.im;
        let ret = "";
        if (this['isNaN']()) {
            return 'NaN';
        }
        if (this['isInfinite']()) {
            return 'Infinity';
        }
        if (Math.abs(a) < Complex.EPSILON) {
            a = 0;
        }
        if (Math.abs(b) < Complex.EPSILON) {
            b = 0;
        }
        // If is real number
        if (b === 0) {
            return ret + a;
        }
        if (a !== 0) {
            ret += a;
            ret += " ";
            if (b < 0) {
                b = -b;
                ret += "-";
            }
            else {
                ret += "+";
            }
            ret += " ";
        }
        else if (b < 0) {
            b = -b;
            ret += "-";
        }
        if (1 !== b) { // b is the absolute imaginary part
            ret += b;
        }
        return ret + "i";
    }
    // Returns the actual number as a vector
    toVector() {
        return [this.re, this.im];
    }
    // Returns the actual real value of the current object
    valueOf() {
        if (this.im === 0) {
            return this.re;
        }
        return null;
    }
    // Determines whether a complex number is not on the Riemann sphere.
    isNaN() {
        return isNaN(this.re) || isNaN(this.im);
    }
    // Determines whether or not a complex number is at the zero pole of the Riemann sphere.
    isZero() {
        return this.im === 0 && this.re === 0;
    }
    // Determines whether a complex number is not at the infinity pole of the Riemann sphere.
    isFinite() {
        return isFinite(this.re) && isFinite(this.im);
    }
    //  Determines whether or not a complex number is at the infinity pole of the Riemann sphere.
    isInfinite() {
        return !this['isFinite']();
    }
}
;
