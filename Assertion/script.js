/* Console.ssert()
Writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.

Note: This feature is available in Web Workers.
The  console.assert() method was implemented differently in older Node.js versions  than the console.assert() method  available in browsers. In browsers, calling console.assert() with a falsy assertion prints message to the console without interrupting execution of subsequent code. Before Node.js v10.0.0, however, a falsy assertion would also cause an AssertionError to be thrown. This discrepancy was fixed with Node v10, so that console.assert() now acts the same in both Node and the browser.

SyntaxSection
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]); // c-like message formatting
ParametersSection
assertion
Any boolean expression. If the assertion is false, the message is written to the console.
obj1 ... objN
A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
msg
A JavaScript string containing zero or more substitution strings.
subst1 ... substN
JavaScript objects with which to replace substitution strings within msg. This parameter gives you additional control over the format of the output.
ExamplesSection
The following code example demonstrates the use of a JavaScript object following the assertion:

const errorMsg = 'the # is not even';
for (let number = 2; number <= 5; number += 1) {
    console.log('the # is ' + number);
    console.assert(number % 2 === 0, {number: number, errorMsg: errorMsg});
    // or, using ES2015 object property shorthand:
    // console.assert(number % 2 === 0, {number, errorMsg});
}
// output:
// the # is 2
// the # is 3
// Assertion failed: {number: 3, errorMsg: "the # is not even"}
// the # is 4
// the # is 5
// Assertion failed: {number: 5, errorMsg: "the # is not even"}
Note that, while a string containing a substitution string works as a parameter for console.log in Node and many, if not most, browsers...

console.log('the word is %s', 'foo');
// output: the word is foo
...the use of such a string does not currently work as intended as a parameter for console.assert in all browsers:

console.assert(false, 'the word is %s', 'foo');
// correct output in Node (e.g. v8.10.0) and some browsers
//     (e.g. Firefox v60.0.2):
// Assertion failed: the word is foo
// incorrect output in some browsers
//     (e.g. Chrome v67.0.3396.87):
// Assertion failed: the word is %s foo
See Outputting text to the console in the documentation of console for further details.
*/
const errorMsg = 'the # is not even';
for (let number = 1; number <= 10; number += 1) {
    console.log('the # is ' + number);
    console.assert(number % 2 === 0, {number: number, errorMsg: errorMsg});
    // or, using ES2015 object property shorthand:
    // console.assert(number % 2 === 0, {number, errorMsg});
}
// output:
// the # is 2
// the # is 3
// Assertion failed: {number: 3, errorMsg: "the # is not even"}
// the # is 4
// the # is 5
// Assertion failed: {number: 5, errorMsg: "the # is not even"}
