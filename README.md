# Fib-it

Fibonacci sequence implemented in 6 different ways with JavaScript. A nice excuse to explore **functions**, **iterators**, **generators**, **iterable values**, **event emitters** and **streams**!

[![npm version](https://badge.fury.io/js/fib-it.svg)](https://badge.fury.io/js/fib-it)
[![CircleCI](https://circleci.com/gh/lmammino/fib-it.svg?style=shield)](https://circleci.com/gh/lmammino/fib-it)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

As usual, npm-it-away:

```bash
npm i --save fib-it
```

## Usage

The library exposes 6 different implementations of the fibonacci sequence.

The sequence will be infinite (as much as it can be considering JavaScript integer space) unless limited to max number.

### _Function-based_ implementation

```javascript
const { genFib } = require('fib-it')

const f = genFib(6) // limit the sequence to numbers below 6
f() // 1
f() // 1
f() // 2
f() // 3
f() // 5
f() // null
f() // null
```

### _itarator-based_ implementation

```javascript
const { genFibIterator } = require('fib-it')

it = genFibIterator(6) // { next: [Function: next] }
it.next() // { value: 1, done: false }
it.next() // { value: 1, done: false }
it.next() // { value: 2, done: false }
it.next() // { value: 3, done: false }
it.next() // { value: 5, done: false }
it.next() // { value: null, done: true }

// or

it = genFibIterator(6)
let result = it.next()
while (!result.done) {
  console.log(result.value)
  result = it.next()
}
// 1
// 1
// 2
// 3
// 5
```

### _generator-based_ implementation

```javascript
gen = fibGenerator(6) // {}
gen.next() // { value: 1, done: false }
gen.next() // { value: 1, done: false }
gen.next() // { value: 2, done: false }
gen.next() // { value: 3, done: false }
gen.next() // { value: 5, done: false }
gen.next() // { value: null, done: true }
gen.next() // { value: undefined, done: true }

// or

gen = fibGenerator(6)
[...gen] // [ 1, 1, 2, 3, 5 ]
```

## _iterable-based_ implementation

```javascript
const { genFibIterable } = require('fib-it')

it = genFibIterable(6) // { [Symbol(Symbol.iterator)]: [GeneratorFunction: [Symbol.iterator]] }
[...it] // [ 1, 1, 2, 3, 5 ]

// or

for (n of f) { console.log(n) }
// 1
// 1
// 2
// 3
// 5
```

### _iterable-based_ implementation

```javascript
const { genFibIterable } = require('fib-it')

it = genFibIterable(6) // { [Symbol(Symbol.iterator)]: [GeneratorFunction: [Symbol.iterator]] }
[...it] // [ 1, 1, 2, 3, 5 ]

// or

for (n of f) { console.log(n) }
// 1
// 1
// 2
// 3
// 5
```

### _event-emitter-based_ implementation

```javascript
const { FibEmitter } = require('fib-it')

const fe = new FibEmitter(6, 10)
fe.on('data', n => console.log(n))
fe.on('end', () => console.log('done!'))
fe.start()
// 1
// 1
// 2
// 3
// 5
// done!
```

### _stream-based_ implementation

```javascript
const s = new FibStream(7) // FibStream { ... }
s.on('data', chunk => console.log(chunk.readUInt32LE(0).toString()))
s.on('end', () => console.log('done!'))
// 1
// 1
// 2
// 3
// 5
// done!
```

## When do I really use this?

There are some [actual use cases](https://www.stocktrader.com/2009/05/26/fibonacci-numbers-investors-sequence-elliot-wave-theory/) for the fibonacci sequence. So maybe you need something like this in your code!

In reality this is just an experiment to compare different methodology to generate data sequences in JavaScript, so I expect it to be used mostly for education purposes rather than for production code.

Also with this goal in mind, the code is kept relatively simple and it's not meant to be _feature-complete_ or _error-proof_.

## Contribute

Feel more than welcome to
[report bugs](https://github.com/lmammino/fib-it/issues) or [propose changes](https://github.com/lmammino/fib-it/pulls).

## License

Licensed under [MIT](https://github.com/lmammino/fib-it/blob/master/LICENSE).
