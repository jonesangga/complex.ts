import { describe, it } from "node:test";
import { Complex } from "../dist/complex.js";
import { deepEqual, equal } from "node:assert/strict";

const functionTests = [{
    set: Complex.I,
    fn: "mul",
    param: new Complex(Math.PI).exp(),
    expect: "23.140692632779267i"
}, {
    set: new Complex(1, 4),
    fn: "mul",
    param: 3,
    expect: "3 + 12i"
}, {
    set: "4 + 3i",
    fn: "add",
    param: "-3 - 2i",
    expect: "1 + i"
}, {
    set: "3i",
    fn: "add",
    param: "-2i",
    expect: "i"
}, {
    set: "4",
    fn: "add",
    param: "-3",
    expect: "1"
}, {
    set: 9,
    fn: "sqrt",
    expect: "3"
}, {
    set: -9,
    fn: "sqrt",
    expect: "3i"
}, {
    set: "-36",
    fn: "sqrt",
    expect: "6i"
}, {
    set: "36i",
    fn: "sqrt",
    expect: "4.242640687119285 + 4.242640687119286i"
}, {
    set: Infinity,
    fn: "mul",
    param: "i",
    expect: "Infinity"
}, {
    set: "-36i",
    fn: "sqrt",
    expect: "4.242640687119285 - 4.242640687119286i"
}, {
    set: "4 + 2i",
    fn: "div",
    param: "0",
    expect: "Infinity"
}, {
    set: "0",
    fn: "div",
    param: Infinity,
    expect: "0"
}, {
    set: -Infinity,
    fn: "div",
    param: 0,
    expect: "Infinity"
}, {
    set: Infinity,
    fn: "div",
    param: Infinity,
    expect: "NaN"
}, {
    set: 0,
    fn: "div",
    param: 0,
    expect: "NaN"
}, {
    set: "4 + 2i",
    fn: "div",
    param: "1 + i",
    expect: "3 - i"
}, {
    set: "25",
    fn: "div",
    param: "3 - 4i",
    expect: "3 + 4i"
}, {
    set: "3 - 2i",
    fn: "div",
    param: "i",
    expect: "-2 - 3i"
}, {
    set: "4i",
    fn: "mul",
    param: "-5i",
    expect: "20"
}, {
    set: "3 - 6i",
    fn: "mul",
    param: "i",
    expect: "6 + 3i"
}, {
    set: Infinity,
    fn: "mul",
    param: 0,
    expect: "NaN"
}, {
    set: "3 + 4i",
    fn: "add",
    param: "5 - 7i",
    expect: "8 - 3i"
}, {
    set: Infinity,
    fn: "add",
    param: Infinity,
    expect: "NaN"
}, {
    set: -Infinity,
    fn: "sub",
    param: -Infinity,
    expect: "NaN"
}, {
    set: "6i",
    fn: "div",
    param: "3 - 12i",
    expect: "-0.47058823529411764 + 0.11764705882352941i"
}, {
    set: "36 + 36i",
    fn: "sqrt",
    expect: "6.59210468080686 + 2.730539163373364i"
}, {
    set: "36 - 36i",
    fn: "sqrt",
    expect: "6.59210468080686 - 2.730539163373364i"
}, {
    set: "-36 + 36i",
    fn: "sqrt",
    expect: "2.730539163373364 + 6.59210468080686i"
}, {
    set: "-36 - 36i",
    fn: "sqrt",
    expect: "2.730539163373364 - 6.59210468080686i"
}, {
    set: "0",
    fn: "sqrt",
    expect: "0"
}, {
    set: Math.E,
    fn: "log",
    expect: "1"
}, {
    set: 0,
    fn: "log",
    expect: "Infinity"
}, {
    set: Infinity,
    fn: "mul",
    param: 3,
    expect: "Infinity"
}, {
    set: "-1",
    fn: "log",
    expect: Math.PI + "i"
}, {
    set: "i",
    fn: "log",
    expect: (Math.PI / 2) + "i"
}, {
    set: "3 + 2i",
    fn: "log",
    expect: Math.log(13) / 2 + " + " + Math.atan2(2, 3) + "i"
}, {
    set: "3 - 2i",
    fn: "log",
    expect: Math.log(13) / 2 + " - " + Math.atan2(2, 3) + "i"
}, {
    set: 1,
    fn: "exp",
    expect: "" + Math.E
}, {
    set: "i",
    fn: "exp",
    expect: Math.cos(1) + " + " + Math.sin(1) + "i"
}, {
    set: "i",
    fn: "mul",
    param: "i",
    expect: "-1"
}, {
    set: "3 + 2i",
    fn: "exp",
    expect: "-8.358532650935372 + 18.263727040666765i"
}, {
    set: "3 - 2i",
    fn: "exp",
    expect: "-8.358532650935372 - 18.263727040666765i"
}, {
    set: "3 - 2i",
    fn: "expm1",
    expect: "-9.358532650935372 - 18.263727040666765i"
}, {
    set: "0",
    fn: "expm1",
    expect: "0"
}, {
    set: "1e-6",
    fn: "expm1",
    expect: "0.0000010000005000001665"
}, {
    set: "1e-5 + 5i",
    fn: "expm1",
    expect: "-0.716334977900736 - 0.9589338639538314i"
}, {
    set: "1.2e-7 - 2e-6i",
    fn: "expm1",
    expect: "1.1999800719976027e-7 - 0.000002000000239998681i"
}, {
    set: "3",
    fn: "pow",
    param: "3",
    expect: "27"
}, {
    set: -2,
    fn: "pow",
    param: 1.5,
    expect: "-2.82842712474619i"
}, {
    set: -8,
    fn: "pow",
    param: 1 / 3,
    expect: "1 + 1.732050807568877i"
}, {
    set: -25,
    fn: "sqrt",
    expect: "5i"
}, {
    set: -25,
    fn: "pow",
    param: 0.5,
    expect: "5i"
}, {
    set: "0",
    fn: "pow",
    param: "1+i",
    expect: "0"
}, {
    set: "i",
    fn: "pow",
    param: "0",
    expect: "1"
}, {
    set: "87",
    fn: "pow",
    param: "3",
    expect: "658503"
}, {
    set: "i",
    fn: "pow",
    param: "1",
    expect: "i"
}, {
    set: "i",
    fn: "pow",
    param: "2",
    expect: "-1"
}, {
    set: "i",
    fn: "pow",
    param: "3",
    expect: "-i"
}, {
    set: "i",
    fn: "pow",
    param: "4",
    expect: "1"
}, {
    set: "i",
    fn: "pow",
    param: "5",
    expect: "i"
}, {
    set: 7,
    fn: "pow",
    param: 2,
    expect: '49'
}, {
    set: 0,
    fn: "pow",
    param: 2,
    expect: '0'
}, {
    set: "3i",
    fn: "pow",
    param: "3i",
    expect: "-0.008876640735623678 - 0.0013801328997494863i"
}, {
    set: { re: 3, im: 4 },
    fn: "abs",
    expect: "5"
}, {
    set: { re: 10, im: 24 },
    fn: "abs",
    expect: "26"
}, {
    set: "+++++--+1 + 4i",
    fn: "mul",
    param: "3 + 2i",
    expect: "-5 + 14i"
}, {
    set: "4 + 16i",
    fn: "div",
    param: "4.0000",
    expect: "1 + 4i"
}, {
    set: { re: -7.1, im: 2.5 },
    fn: "neg",
    expect: "7.1 - 2.5i"
}, {
    set: { re: 1, im: 1 },
    fn: "div",
    param: { re: 3, im: 4 },
    expect: 7 / 25 + " - " + 1 / 25 + "i"
}, {
    set: new Complex(-7.1, 2.5),
    fn: "neg",
    expect: "7.1 - 2.5i"
}, {
    set: { re: 1, im: 1 },
    fn: "arg",
    expect: "" + Math.PI / 4
}, {
    set: { re: -1, im: -1 },
    fn: "arg",
    expect: "" + -3 * Math.PI / 4
}, {
    set: { re: 0, im: 1 },
    fn: "arg",
    expect: "" + Math.PI / 2
}, {
    set: { re: 1, im: 0.5 * Math.sqrt(4 / 3) },
    fn: "arg",
    expect: "" + Math.PI / 6
}, {
    set: "3 + 4i",
    fn: "conjugate",
    expect: "3 - 4i"
}, {
    set: { re: 99, im: 50 },
    fn: "conjugate",
    expect: "99 - 50i"
}, {
    set: { re: 0, im: 0 },
    fn: "conjugate",
    expect: "0"
}, {
    set: { re: 1, im: 23 },
    fn: "conjugate",
    expect: "1 - 23i"
}, {
    set: "2 + 8i",
    fn: "div",
    param: new Complex(1, 2),
    expect: "3.6 + 0.8i"
}, {
    set: "2 + 8i",
    fn: "div",
    param: "2 + 8i",
    expect: "1"
}, {
    set: -Infinity,
    fn: "div",
    param: 3,
    expect: "Infinity"
}, {
    set: "3+4i",
    fn: "add",
    param: "5 - i",
    expect: "8 + 3i"
}, {
    set: { re: 1, im: 2 },
    fn: "add",
    param: "4 + 6i",
    expect: "5 + 8i"
}, {
    set: { re: 5, im: 8 },
    fn: "sub",
    param: "4 + 6i",
    expect: "1 + 2i"
}, {
    set: "3 + 4i",
    fn: "sub",
    param: "2 - 5i",
    expect: "1 + 9i"
}, {
    set: "1 + 2i",
    fn: "pow",
    param: "2",
    expect: "-2.999999999999999 + 4.000000000000001i"
}, {
    set: "1 + 2i",
    fn: "pow",
    param: "1 + 2i",
    expect: "-0.22251715680177267 + 0.10070913113607541i"
}, {
    set: { re: 1, im: 2 },
    fn: "pow",
    param: new Complex(3, 4),
    expect: "0.1290095940744669 + 0.03392409290517001i"
}, {
    fn: "abs",
    set: new Complex(3, 4),
    expect: "5"
}, {
    param: 2,
    fn: "pow",
    set: new Complex(1, 2),
    expect: "-2.999999999999999 + 4.000000000000001i"
}, {
    set: "i",
    fn: "pow",
    param: 7,
    expect: "-i"
}, {
    set: "2+3i",
    fn: "mul",
    param: "4+5i",
    expect: "-7 + 22i"
}, {
    set: "3 + 4i",
    fn: "mul",
    param: "2 - 5i",
    expect: "26 - 7i"
}, {
    set: "i",
    fn: "pow",
    param: 4,
    expect: "1"
}, {
    set: "i",
    fn: "pow",
    param: 5,
    expect: "i"
}, {
    set: "0-0i",
    fn: "pow",
    param: 2,
    expect: "0"
}, {
    set: "0-0i",
    fn: "pow",
    param: 0,
    expect: "1"
}, {
    set: "1 + 4i",
    fn: "sqrt",
    expect: "1.600485180440241 + 1.2496210676876531i"
}, {
    set: { re: -3, im: 4 },
    fn: "sqrt",
    expect: "1 + 2i"
}, {
    set: { re: 3, im: -4 },
    fn: "sqrt",
    expect: "2 - i"
}, {
    set: { re: -3, im: -4 },
    fn: "sqrt",
    expect: "1 - 2i"
}, {
    set: [-2, 0],
    fn: "pow",
    param: 2,
    expect: "4"
}, {
    set: { abs: 1, arg: 0 },
    fn: "equals",
    param: { re: 1, im: 0 },
    expect: "true"
}, {
    set: -Complex.E.pow(2),
    fn: "log",
    expect: "2 + 3.141592653589793i"
}, {
    set: "4 + 3i",
    fn: "log",
    expect: "1.6094379124341003 + 0.6435011087932844i"
}, {
    set: "4 + 3i",
    fn: "exp",
    expect: "-54.051758861078156 + 7.704891372731154i"
}, {
    set: "1-2i",
    fn: "sqrt",
    expect: "1.272019649514069 - 0.7861513777574233i"
}, {
    set: { re: 1, im: 2 },
    fn: "sin",
    expect: "3.165778513216168 + 1.9596010414216063i"
}, {
    set: "i",
    fn: "cos",
    expect: "1.5430806348152437"
}, {
    set: "i",
    fn: "acos",
    expect: "1.5707963267948966 - 0.8813735870195428i"
}, {
    set: { re: 1, im: 2 },
    fn: "cos",
    expect: "2.0327230070196656 - 3.0518977991518i"
}, {
    set: { re: 1, im: 2 },
    fn: "tan",
    expect: "0.03381282607989669 + 1.0147936161466335i"
}, {
    set: { re: 1, im: 3 },
    fn: "sinh",
    expect: "-1.1634403637032504 + 0.21775955162215221i"
}, {
    set: { re: 1, im: 3 },
    fn: "cosh",
    expect: "-1.5276382501165433 + 0.1658444019189788i"
}, {
    set: { re: 1, im: 3 },
    fn: "tanh",
    expect: "0.7680176472869112 - 0.059168539566050726i"
}, {
    set: { re: 1, im: 3 },
    fn: "inverse",
    expect: "0.1 - 0.3i"
}, {
    set: "3+4i",
    fn: "inverse",
    expect: "0.12 - 0.16i" // 3/25 - (4/25)i
}, {
    set: { re: 0.5, im: -0.5 },
    fn: "inverse",
    expect: "1 + i"
}, {
    set: "1 + i",
    fn: "inverse",
    expect: "0.5 - 0.5i"
}, {
    set: "0",
    fn: "inverse",
    expect: "Infinity"
}, {
    set: Infinity,
    fn: "inverse",
    expect: "0"
}, {
    set: Complex['EPSILON'],
    fn: "equals",
    param: 1e-16,
    expect: "true"
}, {
    set: 0,
    fn: "equals",
    param: "5i",
    expect: "false"
}, {
    set: 5,
    fn: "equals",
    param: "5i",
    expect: "false"
}, {
    set: 5,
    fn: "equals",
    param: 5,
    expect: "true"
}, {
    set: "10i",
    fn: "equals",
    param: "10i",
    expect: "true"
}, {
    set: "2 + 3i",
    fn: "equals",
    param: "2 + 3i",
    expect: "true"
}, {
    set: "2 + 3i",
    fn: "equals",
    param: "5i",
    expect: "false"
}, {
    set: "2 + 3i",
    fn: "round",
    param: "0",
    expect: "2 + 3i"
}, {
    set: "2.5 + 3.5i",
    fn: "round",
    param: "1",
    expect: "2.5 + 3.5i"
}, {
    set: "2.5 + 3.5i",
    fn: "sign",
    param: null,
    expect: "0.5812381937190965 + 0.813733471206735i"
}, {
    set: "10 + 24i",
    fn: "sign",
    param: null,
    expect: "0.38461538461538464 + 0.9230769230769231i"
}, {
    set: "1e3i",
    fn: "add",
    param: "3e-3 + 1e2i",
    expect: "0.003 + 1100i"
}, {
    set: "3.14-4i",
    fn: "coth",
    expect: "0.9994481238383576 + 0.0037048958915019857i"
}, {
    set: "8i-31",
    fn: "cot",
    expect: "1.6636768291213935e-7 - 1.0000001515864902i"
}, {
    set: new Complex(1, 1).sub(0, 1), // Distance
    fn: "abs",
    expect: "1"
}, {
    set: new Complex(1, 1), // Rotate around center
    fn: "mul",
    param: { abs: 1, arg: Math.PI / 2 },
    expect: "-0.9999999999999999 + i"
}, {
    set: new Complex(1, 1).sub(0, 1).mul({ abs: 1, arg: Math.PI / 2 }), // Rotate around another point
    fn: "add",
    param: "i",
    expect: "2i"
}, {
    set: new Complex(0, 10000000000),
    fn: "log",
    param: null,
    expect: "23.025850929940457 + 1.5707963267948966i"
}, {
    set: new Complex(0, 1000000000000000),
    fn: "log",
    param: null,
    expect: "34.538776394910684 + 1.5707963267948966i"
}, {
    set: new Complex(0, 100000000000000000),
    fn: "log",
    param: null,
    expect: "39.14394658089878 + 1.5707963267948966i"
}, {
    set: new Complex(0, 10000000000000000000),
    fn: "log",
    param: null,
    expect: "43.74911676688687 + 1.5707963267948966i"
}, {
    set: new Complex(0, 1e+30),
    fn: "log",
    param: null,
    expect: "69.07755278982137 + 1.5707963267948966i"
}, {
    set: new Complex(1, 10000000000),
    fn: "log",
    param: null,
    expect: "23.025850929940454 + 1.5707963266948965i"
}, {
    set: new Complex(1, 1000000000000000),
    fn: "log",
    param: null,
    expect: "34.538776394910684 + 1.5707963267948957i"
}, {
    set: new Complex(1, 100000000000000000),
    fn: "log",
    param: null,
    expect: "39.14394658089878 + 1.5707963267948966i"
}, {
    set: new Complex(1, 10000000000000000000),
    fn: "log",
    param: null,
    expect: "43.74911676688687 + 1.5707963267948966i"
}, {
    set: new Complex(1, 1e+30),
    fn: "log",
    param: null,
    expect: "69.07755278982137 + 1.5707963267948966i"
}, {
    set: new Complex(-1, 10000000000),
    fn: "log",
    param: null,
    expect: "23.025850929940454 + 1.5707963268948968i"
}, {
    set: new Complex(-1, 1000000000000000),
    fn: "log",
    param: null,
    expect: "34.538776394910684 + 1.5707963267948977i"
}, {
    set: new Complex(-1, 100000000000000000),
    fn: "log",
    param: null,
    expect: "39.14394658089878 + 1.5707963267948968i"
}, {
    set: new Complex(-1, 10000000000000000000),
    fn: "log",
    param: null,
    expect: "43.74911676688687 + 1.5707963267948966i"
}, {
    set: new Complex(-1, 1e+30),
    fn: "log",
    param: null,
    expect: "69.07755278982137 + 1.5707963267948966i"
}];


const constructorTests = [{
    set: null,
    expect: "0"
}, {
    set: undefined,
    expect: "0"
}, {
    set: "foo",
    error: "SyntaxError: Invalid Param"
}, {
    set: {},
    error: "SyntaxError: Invalid Param"
}, {
    set: " + i",
    expect: "i"
}, {
    set: "3+4i",
    expect: "3 + 4i"
}, {
    set: "i",
    expect: "i"
}, {
    set: "3",
    expect: "3"
}, {
    set: [9, 8],
    expect: "9 + 8i"
}, {
    set: "2.3",
    expect: "2.3"
}, {
    set: "2.3",
    expect: "2.3"
}, {
    set: "0",
    expect: "0"
}, {
    set: "-0",
    expect: "0"
}, {
    set: { re: -0, im: 0 },
    expect: "0"
}, {
    set: { re: 0, im: -0 },
    expect: "0"
}, {
    set: Infinity,
    expect: "Infinity"
}, {
    set: -Infinity,
    expect: "Infinity"
}, {
    set: { re: Infinity, im: 0 },
    expect: "Infinity"
}, {
    set: { re: -Infinity, im: 0 },
    expect: "Infinity"
}, {
    set: { re: 0, im: Infinity },
    expect: "Infinity"
}, {
    set: { re: 0, im: -Infinity },
    expect: "Infinity"
}, {
    set: " + 7  - i  +  3i   -  +  +  +  + 43  +  2i  -  i4  +  -  33  +  65 - 1	",
    expect: "-5"
}, {
    set: " + 7  - i  +  3i   -  +  +  +  + 43  +  2i  -  i4  +  -  33  +  65 - 1	 + ",
    error: "SyntaxError: Invalid Param"
}, {
    set: "-3x + 4",
    error: "SyntaxError: Invalid Param"
}, {
    set: "- + 7",
    expect: "-7"
}, {
    set: "4 5i",
    error: "SyntaxError: Invalid Param"
}, {
    set: "-",
    error: "SyntaxError: Invalid Param"
}, {
    set: "2.2e-1-3.2e-1i",
    expect: "0.22 - 0.32i"
}, {
    set: "2.2.",
    error: "SyntaxError: Invalid Param"
}, {
    set: { r: 0, phi: 4 },
    expect: "0"
}, {
    set: { r: 1, phi: 1 },
    expect: "0.5403023058681398 + 0.8414709848078965i"
}, {
    set: { r: Infinity, phi: 0 },
    expect: "Infinity"
}, {
    set: { r: Infinity, phi: 2 },
    expect: "Infinity"
}, {
    set: { r: Infinity, phi: Infinity },
    expect: "NaN"
}, {
    set: { r: Infinity, phi: NaN },
    expect: "NaN"
},{
    set: "1000_000i",
    expect: "1000000i"
}
];

for (let i = 0, len = constructorTests.length; i < len; ++i) {
    if (constructorTests[i].set != null && constructorTests[i].set.hasOwnProperty('r')) {
        constructorTests.push({
            set: {
                abs: constructorTests[i].set.r,
                arg: constructorTests[i].set.phi,
            },
            expect: constructorTests[i].expect
        })
    }
}

function stringify(value) {
    return JSON.stringify(value, function replacer(key, val) {
        if (typeof val === "number") {
            return val.toString();
        }
        return val;
    })
}

function describeTest(test) {
    const ctor = "new Complex(" + (test.set !== undefined ? stringify(test.set) : "") + ")";

    const fnCall = test.fn == null
        ? ""
        : "." + test.fn + "(" + (test.param !== undefined ? stringify(test.param) : "") + ")";

    const expectedResult = test.expect == null
        ? ""
        : " === " + stringify(test.expect);

    const error = test.error == null
        ? ""
        : " should throw " + test.error;

    return ctor + fnCall + expectedResult + error;
}

describe("Complex functions", () => {
    for (const test of functionTests) {
        it(describeTest(test), () => {
            if (test.error) {
                try {
                    new Complex(test.set)[test.fn](test.param);
                } catch (e) {
                    equal(e.toString(), test.error.toString());
                }
            } else {
                equal(new Complex(test.set)[test.fn](test.param).toString(), test.expect);
            }
        });
    }
});

describe("Complex constructor", () => {
    for (const test of constructorTests) {
        it(describeTest(test), () => {
            if (test.error) {
                try {
                    new Complex(test.set);
                } catch (e) {
                    equal(e.toString(), test.error.toString());
                }
            } else {
                equal(new Complex(test.set).toString(), test.expect);
            }
        });
    }
});

describe("Complex Details", () => {
    it("should work with different params", () => {
        equal(new Complex(1, -1).toString(), "1 - i");
        equal(new Complex(0, 0).toString(), "0");
        equal(new Complex(0, 2).toString(), "2i");
        equal(Complex.I.toString(), "i");
        equal(new Complex(0, -2).toString(), "-2i");
        equal(new Complex({ re: 0, im: -2 }).toString(), "-2i");
    });

    it("Complex Combinations", () => {
        const zero = new Complex(0, 0);
        const one = new Complex(1, 1);
        const two = new Complex(2, 2);

        equal(zero.toString(), "0");
        equal(one.toString(), "1 + i");
        deepEqual(one.neg(), (new Complex(-1, -1)));
        deepEqual(one.conjugate(), (new Complex(1, -1)));
        equal(one.abs(), Math.SQRT2);
        equal(one.arg(), Math.PI / 4);
        equal(one.add(one).toString(), two.toString());
        equal(one.sub(one).toString(), zero.toString());
        equal(one.mul(2).toString(), two.toString());
        equal(one.mul(one).toString(), new Complex(0, 2).toString());
        equal(one.div(2).toString(), "0.5 + 0.5i");
        equal(one.div(one).toString(), "1");
        equal(one.div(0).toString(), "Infinity");
        equal(one.exp().toString(), "1.4686939399158851 + 2.2873552871788423i");
        equal(one.log().toString(), "0.34657359027997264 + 0.7853981633974483i");
        equal(one.pow(one).toString(), "0.2739572538301211 + 0.5837007587586147i");
        equal(one.pow(zero).toString(), "1");
        equal(one.sqrt().toString(), "1.09868411346781 + 0.45508986056222733i");
        equal(one.sin().toString(), "1.2984575814159773 + 0.6349639147847361i");
        equal(one.cos().toString(), "0.8337300251311491 - 0.9888977057628651i");
        equal(one.tan().toString(), "0.27175258531951174 + 1.0839233273386948i");
        equal(one.asin().toString(), "0.6662394324925153 + 1.0612750619050355i");
        equal(one.acos().toString(), "0.9045568943023813 - 1.0612750619050355i");
        equal(one.atan().toString(), "1.0172219678978514 + 0.40235947810852507i");

        const t = new Complex(3, 4);
        equal(t.asinh().toString(), "2.29991404087927 + 0.9176168533514786i");

        equal(t.abs(), 5);

        equal(new Complex("5i + 3").log().exp().toString(), "3 + 5i")
        equal(new Complex("-2i - 1").log().exp().toString(), "-1 - 2i")
    });

    it("should calculate distributed conjugate", () => {
        const c1 = new Complex(7, 3);
        const c2 = new Complex(1, 2);

        const r1 = c1.add(c2).conjugate();
        const r2 = c1.conjugate().add(c2.conjugate());

        equal(r1.toString(), r2.toString());
    });

    it("should be raised to power of 6", () => {
        const c1 = new Complex(2, 2);

        const t = c1.pow(6);

        equal(t.toString(), "-9.405287417451663e-14 - 511.9999999999995i");
    });

    it("should handle inverse trig fns", () => {
        const values = [
            new Complex(2.3, 1.4),
            new Complex(-2.3, 1.4),
            new Complex(-2.3, -1.4),
            new Complex(2.3, -1.4)
        ];

        const fns = ['sin', 'cos', 'tan'];

        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < 3; j++) {
                const a = values[i]['a' + fns[j]]()[fns[j]]();

                const res = values[i];

                equal(Math.abs(a.re - res.re) < 1e-12 && Math.abs(a.im - res.im) < 1e-12, true);
            }
        }
    });

    it('should handle get real part', () => {
        equal(new Complex({ abs: 1, arg: Math.PI / 4 }).re, Math.SQRT2 / 2);
    });

    it('should handle get complex part', () => {
        equal(new Complex({ abs: 1, arg: Math.PI / 4 }).im, 0.7071067811865475);
    });

    it('should handle sum', () => {
        equal(new Complex({ abs: 1, arg: 0 }).add({ abs: 1, arg: Math.PI / 2 }).abs(), Math.SQRT2);
        equal(new Complex({ abs: 1, arg: 0 }).add({ abs: 1, arg: Math.PI / 2 }).arg(), Math.PI / 4);
    });

    it('should handle conjugate', () => {
        equal(new Complex({ abs: 1, arg: Math.PI / 4 }).conjugate().toString(), new Complex({ abs: 1, arg: -Math.PI / 4 }).toString());
    });

    it('should handle substract', () => {
        equal(new Complex({ abs: 1, arg: 0 }).sub({ abs: 1, arg: Math.PI / 2 }).abs().toString(), "1.414213562373095");
        equal(new Complex({ abs: 1, arg: 0 }).sub({ abs: 1, arg: Math.PI / 2 }).arg().toString(), "-0.7853981633974484");
    });

    it('should handle arg for the first quadrant', () => {
        equal(new Complex({ re: 1, im: 1 }).arg(), Math.PI / 4);
    });

    it('should handle arg for the second quadrant', () => {
        equal(new Complex({ re: -1, im: 1 }).arg(), 3 * Math.PI / 4);
    });

    it('should handle arg for the third quadrant', () => {
        equal(new Complex({ re: -1, im: -1 }).arg(), -3 * Math.PI / 4);
    });

    it('should handle arg for the fourth quadrant', () => {
        equal(new Complex({ re: 1, im: -1 }).arg(), -Math.PI / 4);
    });

    it('should handle arg for the fourth and first quadrant', () => {
        equal(new Complex({ re: 1, im: 0 }).arg(), 0);
    });

    it('should handle arg for first and second quadrant', () => {
        equal(new Complex({ re: 0, im: 1 }).arg(), Math.PI / 2);
    });

    it('should handle arg for the second and third quadrant', () => {
        equal(new Complex({ re: -1, im: 0 }).arg(), Math.PI);
    });

    it('should handle arg for the third and fourth quadrant', () => {
        equal(new Complex({ re: 0, im: -1 }).arg(), -Math.PI / 2);
    });

    it("should eat its own dog food", () => {
        const a = new Complex(1, -5).toString();
        const b = new Complex(a).toString();
        const c = new Complex(b).mul(a);

        equal(c.toString(), '-24 - 10i');
    });

    it("should calculate the absolute value of i", () => {
        const a = new Complex("i").sign().inverse().mul("i");

        equal(a.toString(), '1');
    });

    it('should take the natural logarithm', () => {
        const n = new Complex(Math.E * Math.E).log().div("i").mul(-Math.PI * 2, 1);

        equal(n.toString(), '2 + ' + 4 * Math.PI + "i");
    });

    it('should follow exp rules', () => {
        const a = Math.random() * 10;
        const b = Math.random() * 10;

        const t1 = new Complex({re: a, im: b}).exp();
        const t2 = new Complex(a).exp().mul(Complex.I.mul(b).exp());
        const t3 = new Complex(a).exp().mul(new Complex({re:0, im: b}).exp());

        equal(t1.toString(), t2.toString());
        equal(t2.toString(), t3.toString());
    });

});
